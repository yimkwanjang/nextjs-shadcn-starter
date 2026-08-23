# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

> ⚠️ 위 `@AGENTS.md`가 지시하듯 이 프로젝트의 Next.js는 학습 데이터와 다를 수 있다.
> Next.js API를 쓰기 전 `node_modules/next/dist/docs/`의 해당 가이드를 먼저 확인한다.

웹 개발을 빠르게 시작하기 위한 스타터 킷. 모든 스택은 각 공식문서의 최신 설치 가이드를 준수한다.

## Project Context
- PRD 문서: @docs/PRD.md
- 개발 로드맵: @docs/ROADMAP.md

## 명령어

```bash
npm run dev     # 개발 서버 (http://localhost:3000, Turbopack)
npm run build   # 프로덕션 빌드 — 컴파일 + 타입체크를 함께 수행(별도 tsc 스크립트 없음)
npm run start   # 프로덕션 서버
npm run lint    # ESLint (flat config)

npx shadcn@latest add <컴포넌트명>   # UI 컴포넌트 추가 (예: dialog, tabs, table)
```

- 테스트 러너는 아직 없다. 타입 안전성 검증은 `npm run build`로 한다.
- 변경 검증 시 `.next` 캐시를 지우고 빌드하면 오탐을 줄일 수 있다: `rm -rf .next && npm run build`.
  단, **dev 서버가 떠 있는 채로 이 명령을 실행하지 말 것** — dev 서버와 빌드가 같은 `.next`를
  공유해 캐시가 깨지고, 브라우저에 `Internal Server Error`가 뜬다. 검증 빌드는 dev 서버를
  끄고(`lsof -ti:3000 | xargs kill`) 실행하거나, 브라우저 확인만 할 거면 dev 서버로 충분하다.

## 스택 버전 (버전 의존 동작이 있으므로 고정)

| 스택 | 버전 | 비고 |
|------|------|------|
| Next.js | 16.2.10 (App Router, Turbopack 기본) | `create-next-app@latest` 기본값 |
| React | 19.2 | Next 16 내장 |
| TailwindCSS | v4 | `tailwind.config` **파일 없음** — PostCSS 플러그인 방식 |
| shadcn/ui | base-nova (Base UI 기반, **Radix 아님**) | 아이콘 lucide-react |
| next-themes | 0.4 | 다크모드 class 전략 |
| 공통 훅 | usehooks-ts 3.1 · use-local-storage-state 19 | `useMediaQuery`·`useLocalStorage` 등 직접 구현 금지(↓ 정책) |

> 최초 요청은 Next.js v15였으나 최신 공식 툴체인(create-next-app / shadcn)이 Next 16 + Base UI를
> 전제로 동작해, 사용자 확인 후 **16으로 확정**했다. 15로 되돌리면 ESLint flat config가 깨진다.

## 아키텍처에서 먼저 알아야 할 것

여러 파일을 읽어야 파악되는 "큰 그림"과 함정만 정리한다.

- **Tailwind v4 = 설정 파일이 없다.** `src/app/globals.css`가 진입점이며(`@import "tailwindcss"`),
  테마 토큰(색상·폰트 등)은 그 안의 `@theme` 블록에 CSS 변수로 정의한다.
  `tailwind.config.{js,ts}`를 만들지 말 것 — Tailwind가 무시하거나 혼란을 준다.

- **shadcn 프리미티브는 Radix가 아니라 Base UI(`@base-ui/react`)다.** 이 차이가 실제 코드를 바꾼다:
  트리거를 다른 컴포넌트로 합성할 때 Radix의 `asChild`가 **없다**. 대신 `render` prop을 쓴다.
  - 올바름: `<DropdownMenuTrigger render={<Button variant="outline" />}>메뉴</DropdownMenuTrigger>`
  - 틀림(빌드 타입 오류): `<DropdownMenuTrigger asChild><Button>메뉴</Button></DropdownMenuTrigger>`
  새 컴포넌트는 `npx shadcn@latest add`로 받아 `src/components/ui/`에 두고 API를 확인한 뒤 쓴다.

- **테마 시스템은 세 곳이 맞물린다.** `src/app/layout.tsx`가 (1) `<html>`에
  `suppressHydrationWarning`을 두고, (2) `ThemeProvider`(`attribute="class"`, `defaultTheme="system"`)로
  전체를 감싸고, (3) `Toaster`(sonner)를 렌더한다. `.dark` 클래스 기반이라
  `theme-toggle.tsx`는 `useEffect`/mounted 플래그 없이 CSS로 아이콘을 전환한다
  (해당 패턴이 Next 16 `react-hooks` 린트 규칙도 통과시킴).

- **레이아웃은 라우트 그룹으로 셸을 나눈다.** `src/app/(app)/`와 `src/app/(auth)/`는
  URL에 영향을 주지 않는 그룹이며 각자 `layout.tsx`로 셸을 정의한다:
  - `(app)/layout.tsx` = 대시보드 앱 셸(사이드바+헤더+푸터). `/dashboard`·`/settings`가 공유.
  - `(auth)/layout.tsx` = 중앙 정렬 인증 셸. `/login`이 사용.
  - 랜딩(`/`)은 두 그룹 어디에도 속하지 않고 자체 `SiteHeader`를 쓴다.
  셸의 재사용 조각은 `src/components/layout/`에 있다(단일 진실원본 `nav-config.ts` →
  `nav-links.tsx`가 `usePathname`으로 활성 강조 / `mobile-nav.tsx`는 md 미만에서 Sheet 드로어 /
  `app-header.tsx`가 경로 기반 동적 브레드크럼). 반응형 전환은 CSS(`hidden md:flex`,
  `md:hidden`)로 처리하며 JS 미디어쿼리에 의존하지 않는다.
  - **불변식**: `nav-config.ts`의 `mainNav`에 링크를 추가하면 반드시 대응하는 `page.tsx`도
    만들어야 한다. 링크만 있고 페이지가 없으면 클릭 시 앱 셸까지 사라지는 전체 화면 404가 뜬다.
    현재 `/dashboard`(+`analytics`·`documents`·`users` 서브 페이지)·`/settings`가 존재한다.
    브레드크럼 라벨도 같은 파일의 `routeLabels`에 함께 등록한다.

- **공통 훅은 직접 구현하지 말고 설치된 라이브러리를 쓴다.** `useMediaQuery`는 `usehooks-ts`,
  로컬스토리지 상태는 `use-local-storage-state`(탭 간 동기화·SSR 안전)를 사용한다.
  더 나은 대안이 없는 한 이 둘을 우선하고, 손수 훅을 작성하지 않는다.

- **`middleware.ts`는 없다 — Next 16에서 `proxy.ts`로 개칭됐다.** 요청 전처리(인증 게이트,
  리다이렉트, 헤더 조작)는 `src/proxy.ts`에 `export function proxy(request: NextRequest)`로 쓴다.
  학습 데이터대로 `middleware.ts`를 만들면 **파일이 조용히 무시되어** 게이트가 아예 실행되지 않는다.
  또한 공식 문서는 Proxy를 완전한 인가 수단으로 쓰지 말라고 명시한다 — 낙관적 검사만 하고
  실제 권한 판정은 데이터 접근 계층에서 한 번 더 한다.
  (근거: `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`,
  `middleware.ts → proxy.ts` codemod 제공)

- **캐싱은 "이전 모델"을 쓴다.** `next.config.ts`에 `cacheComponents`가 **켜져 있지 않다.**
  따라서 `use cache` / `cacheLife` / `cacheTag`는 **사용할 수 없다**(해당 플래그 전용 API).
  대신 라우트 세그먼트 `export const revalidate`, `fetch(..., { next: { tags, revalidate } })`,
  `unstable_cache`, `revalidateTag`를 쓴다. 외부 SDK(예: Notion 공식 SDK)는 Next가 패치한
  `fetch`를 타지 않을 수 있으므로 `unstable_cache`로 감싸야 캐시가 실제로 걸린다.
  근거 문서: `node_modules/next/dist/docs/01-app/02-guides/caching-without-cache-components.md`.
  (`cacheComponents`를 켜기로 결정하면 `01-getting-started/08-caching.md`로 기준이 바뀐다.)
  주의: **dev 서버는 페이지를 캐시하지 않는다** — 캐시·재검증 동작 검증은 `npm run build && npm run start`로만 가능하다.

- **경로 alias `@/*` → `src/*`** (`tsconfig.json`). import는 상대경로 대신 alias를 쓴다.

- **`my-app/`는 프로젝트 본체가 아니다.** 실수로 생성된 중첩 `create-next-app` 스캐폴드이며
  `.gitignore` 처리되어 있다. 여기 안의 파일을 수정하거나 참조하지 말 것 — 실제 앱은 저장소 루트다.

## 저장소 자산과 문서 위치

- **서브에이전트** (`.claude/agents/`)
  - `code-reviewer` — 코드 작성·수정 직후 **자동 호출**한다. 읽기 전용이며 위 함정들을 우선 점검한다.
  - `prd-generator` — PRD/요구사항 정의서 작성. 산출물은 `docs/` 아래 마크다운.
- **슬래시 명령** (`.claude/commands/`): `/commit`, `/git:commit`
- **MCP** (`.mcp.json`): Playwright MCP 서버(`@playwright/mcp`)가 설정돼 있다(브라우저 자동화/E2E
  확인용). 단 `package.json`에는 아직 테스트 스크립트가 없다. 참고: 현재 `command`가 `nx`로
  되어 있는데 표준은 `npx`이므로, 서버 기동이 안 되면 이 값부터 확인한다.
- **문서 위치가 두 곳으로 갈려 있다.** `doc/`에는 `PRD_PROMPT.md`(메타 프롬프트), `docs/`에는
  `PRD.md`(산출물)가 있다. 새 문서는 **`docs/`** 에 쓴다.
- `docs/PRD.md` = 노션 견적서 웹 열람/PDF 다운로드 MVP의 요구사항 정의서. 이 저장소에서
  실제로 무엇을 만들려는지가 여기 있으므로, 기능 구현 전에 먼저 읽는다.

## 클라이언트/서버 컴포넌트 경계

`src/app/*`는 기본 서버 컴포넌트다. 상호작용(상태·이벤트·`useTheme`·`usePathname` 등)이
필요한 파일만 상단에 `"use client"`를 붙인다(예: `theme-toggle`, `nav-links`, `mobile-nav`,
`user-menu`, `app-header`, `settings-form`, `overview-tabs`). 서버 컴포넌트인 페이지(`dashboard`,
`settings` 등)는 이 클라이언트 조각을 import해 조합한다. 라우트 그룹의 `layout.tsx`도
서버 컴포넌트이며 클라이언트 셸 조각을 조합만 한다.
