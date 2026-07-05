# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

> ⚠️ 위 `@AGENTS.md`가 지시하듯 이 프로젝트의 Next.js는 학습 데이터와 다를 수 있다.
> Next.js API를 쓰기 전 `node_modules/next/dist/docs/`의 해당 가이드를 먼저 확인한다.

웹 개발을 빠르게 시작하기 위한 스타터 킷. 모든 스택은 각 공식문서의 최신 설치 가이드를 준수한다.

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

- **공통 훅은 직접 구현하지 말고 설치된 라이브러리를 쓴다.** `useMediaQuery`는 `usehooks-ts`,
  로컬스토리지 상태는 `use-local-storage-state`(탭 간 동기화·SSR 안전)를 사용한다.
  더 나은 대안이 없는 한 이 둘을 우선하고, 손수 훅을 작성하지 않는다.

- **경로 alias `@/*` → `src/*`** (`tsconfig.json`). import는 상대경로 대신 alias를 쓴다.

## 클라이언트/서버 컴포넌트 경계

`src/app/*`는 기본 서버 컴포넌트다. 상호작용(상태·이벤트·`useTheme`·`usePathname` 등)이
필요한 파일만 상단에 `"use client"`를 붙인다(예: `theme-toggle`, `nav-links`, `mobile-nav`,
`user-menu`, `app-header`, `settings-form`, `overview-tabs`). 서버 컴포넌트인 페이지(`dashboard`,
`settings` 등)는 이 클라이언트 조각을 import해 조합한다. 라우트 그룹의 `layout.tsx`도
서버 컴포넌트이며 클라이언트 셸 조각을 조합만 한다.
