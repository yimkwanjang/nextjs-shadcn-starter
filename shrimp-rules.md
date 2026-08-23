# Development Guidelines (shrimp-rules.md)

> Coding Agent 전용 규칙. 이 저장소에서만 참인 규칙만 담는다. 일반 개발지식·기능 설명은 배제한다.
> 학습 데이터의 Next.js 관례를 신뢰하지 말 것 — 이 프로젝트의 Next.js는 다르다.
> API 사용 전 `node_modules/next/dist/docs/`의 해당 가이드를 먼저 읽는다.

## 프로젝트 개요

- **목적**: 노션 견적서 웹 열람 / PDF 다운로드 MVP (요구사항은 `docs/PRD.md`).
- **스택(고정, 임의 변경 금지)**: Next.js 16.2.x(App Router, Turbopack) · React 19.2 · TailwindCSS v4 · shadcn `base-nova`(=`@base-ui/react`, **Radix 아님**) · next-themes 0.4 · lucide-react · sonner.
- **기능 구현 전 반드시** `docs/PRD.md`를 먼저 읽는다.

## 편집 금지 영역 (최우선)

- **금지**: `my-app/` 하위 수정·참조 — 실수로 생성된 중첩 스캐폴드(gitignore). 실제 앱은 저장소 루트다.
- **금지**: `.claude/worktrees/roadmap-doc/` 하위 수정·참조 — git worktree 저장소 복제본. 실제 코드가 아니다.
- **금지**: `node_modules/` 수정. 단 `node_modules/next/dist/docs/`는 **읽기 전용 참조용으로 반드시 활용**한다.
- **금지**: `tailwind.config.{js,ts}` 파일 생성 — Tailwind v4는 설정 파일이 없다(무시되거나 혼란 유발).

## 디렉터리·파일 배치 규칙

- 신규 페이지: `src/app/(app)/` 또는 `src/app/(auth)/` 라우트 그룹 하위. 그룹은 URL에 영향 없음.
  - `(app)/layout.tsx` = 대시보드 셸(사이드바+헤더+푸터). `/dashboard`·`/settings`가 공유.
  - `(auth)/layout.tsx` = 중앙 정렬 인증 셸. `/login`이 사용.
  - 랜딩 `src/app/page.tsx`는 두 그룹에 속하지 않고 `SiteHeader`를 쓴다.
- 신규 UI 프리미티브: `npx shadcn@latest add <이름>`로 받아 `src/components/ui/`에 둔다. 손수 작성 금지.
- 셸 재사용 조각: `src/components/layout/`. 도메인 컴포넌트: `src/components/<도메인>/`.
- 유틸: `src/lib/`. import는 **항상 alias `@/*`(→`src/*`)** 사용, 상대경로 금지.
- 신규 문서(마크다운): **`docs/`** 에 쓴다. `doc/`(메타 프롬프트)에는 쓰지 않는다.

## 내비게이션 불변식 (다중 파일 연동, 위반 시 전체화면 404)

- 단일 진실원본: `src/components/layout/nav-config.ts`.
- **`mainNav`에 링크 추가 시 다음을 동시에 수행**한다:
  1. 대응하는 `src/app/(app)/.../page.tsx`를 반드시 생성. (링크만 있고 페이지 없으면 클릭 시 앱 셸까지 사라지는 전체화면 404)
  2. `routeLabels`에 해당 경로 세그먼트 → 한글 라벨 등록(브레드크럼용).
- 반응형 전환은 CSS(`hidden md:flex`, `md:hidden`)로 한다. JS 미디어쿼리로 내비를 분기하지 않는다.

## Base UI 컴포넌트 규칙 (Radix 아님)

- 트리거를 다른 컴포넌트로 합성할 때 **`asChild` 금지 → `render` prop 사용**.
  - 가능: `<DropdownMenuTrigger render={<Button variant="outline" />}>메뉴</DropdownMenuTrigger>`
  - 금지(빌드 타입 오류): `<DropdownMenuTrigger asChild><Button>메뉴</Button></DropdownMenuTrigger>`
- 새 프리미티브 사용 전 `src/components/ui/<이름>.tsx`에서 실제 API를 확인한 뒤 쓴다.

## 스타일·테마 규칙

- 테마 토큰(색상·폰트)은 `src/app/globals.css`의 `@theme` 블록에 CSS 변수로 정의. 진입점은 `@import "tailwindcss"`.
- 테마 전환은 `.dark` 클래스 기반. `theme-toggle.tsx`는 `useEffect`/mounted 플래그 없이 CSS로 아이콘 전환(이 패턴 유지 — `react-hooks` 린트 통과).
- 다크모드 관련 3요소는 `src/app/layout.tsx`에 있다: `<html suppressHydrationWarning>`, `ThemeProvider(attribute="class", defaultTheme="system")`, `Toaster`(sonner). 이 구성을 임의 변경하지 않는다.

## 클라이언트/서버 컴포넌트 경계

- `src/app/*`는 기본 서버 컴포넌트다.
- `"use client"`는 상태·이벤트·`useTheme`·`usePathname` 등 상호작용이 필요한 파일 상단에만 붙인다.
- 서버 컴포넌트 페이지는 클라이언트 조각을 import해 조합만 한다. 라우트 그룹 `layout.tsx`도 서버 컴포넌트다.

## 요청 전처리 (인증 게이트/리다이렉트)

- **`middleware.ts` 생성 금지** — Next 16에서 조용히 무시됨.
- 요청 전처리는 `src/proxy.ts`에 `export function proxy(request: NextRequest)`로 작성.
- Proxy는 낙관적 검사만. 실제 권한 판정은 데이터 접근 계층에서 한 번 더 한다.

## 캐싱 규칙 (cacheComponents 꺼짐)

- `next.config.ts`에 `cacheComponents`가 없다. 따라서 **`use cache`·`cacheLife`·`cacheTag` 사용 금지**(해당 플래그 전용 API).
- 대신 사용: 라우트 세그먼트 `export const revalidate`, `fetch(..., { next: { tags, revalidate } })`, `unstable_cache`, `revalidateTag`.
- 외부 SDK(예: Notion 공식 SDK) 호출은 Next 패치 `fetch`를 안 탈 수 있으므로 **`unstable_cache`로 감싸야** 캐시가 걸린다.
- 근거: `node_modules/next/dist/docs/01-app/02-guides/caching-without-cache-components.md`.
- 캐시/재검증 검증은 `npm run build && npm run start`로만 가능(**dev 서버는 페이지를 캐시하지 않음**).

## 공통 훅 규칙

- `useMediaQuery` → `usehooks-ts`. 로컬스토리지 상태 → `use-local-storage-state`(탭 간 동기화·SSR 안전).
- **이 훅들을 직접 구현 금지.** 더 나은 대안이 없는 한 위 라이브러리를 우선한다.

## 빌드·검증 규칙

- 타입 안전성 검증 = `npm run build`(컴파일+타입체크 동시 수행, 별도 `tsc` 스크립트 없음). 테스트 러너는 아직 없다.
- 캐시 오탐 줄이려면 `rm -rf .next && npm run build`.
  - **금지**: dev 서버가 떠 있는 채로 `rm -rf .next` 실행(`.next` 공유로 캐시 손상 → `Internal Server Error`).
  - 검증 빌드 전 dev 서버 종료: `lsof -ti:3000 | xargs kill`.
- UI 컴포넌트 추가: `npx shadcn@latest add <이름>`.

## 언어 규칙

- 주석·커밋 메시지·문서 = **한국어**.
- 변수명·함수명·파일명 = 영어(코드 표준).
- 한국어로 표현 가능한 단어는 한국어(editor→편집자, dry run→시뮬레이션 등).

## 워크플로 규칙

- 코드를 작성·수정한 **직후 `code-reviewer` 서브에이전트를 자동 호출**한다(사용자 요청 없이도). 읽기 전용이며 위 함정들을 우선 점검.
- 커밋은 `/commit` 또는 `/git:commit` 슬래시 명령을 사용.
- 완료 보고 전 실제 동작을 검증한다. 미검증 상태로 "완료"라고 말하지 않는다.

## AI 의사결정 기준

- Next.js API 동작이 불확실 → 학습 데이터 대신 `node_modules/next/dist/docs/`를 먼저 읽는다.
- 외부 API(예: Notion) 동작이 불확실 → 추측 금지, "검증 필요"로 남기거나 공식 문서 확인.
- 훅이 필요 → 먼저 설치된 라이브러리에 있는지 확인 후 사용, 없을 때만 신규 작성 검토.
- 링크/페이지 불일치 발견 → 내비게이션 불변식(위)에 따라 즉시 정합화.

## 금지 사항 요약

- `tailwind.config.*` 생성 · `middleware.ts` 생성 · `use cache`/`cacheLife`/`cacheTag` 사용.
- `asChild` 사용(→`render` prop).
- `my-app/`·`.claude/worktrees/roadmap-doc/` 수정·참조.
- 상대경로 import(→`@/*`).
- `useMediaQuery`/로컬스토리지 훅 직접 구현.
- dev 서버 켠 채 `rm -rf .next`.
- 미검증 완료 보고.
