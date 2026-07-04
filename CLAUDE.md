@AGENTS.md

# CLAUDE.md — Next.js Starter Kit

웹 개발을 빠르게 시작하기 위한 스타터 킷. 모든 스택은 **공식문서 최신 설치 가이드**를 준수한다.
(Next.js 공식 코딩 규칙은 위 `@AGENTS.md` 참조)

## 기술 스택 (공식문서 준수 검증 완료)

| 스택 | 버전 | 공식 가이드 준수 사항 |
|------|------|----------------------|
| Next.js | 16.2.10 (App Router, Turbopack 기본) | `create-next-app@latest` 기본값 |
| React | 19.2 | Next 16 내장 |
| TypeScript | 5.x | Next 내장, `src/` + `@/*` alias |
| TailwindCSS | v4 | `@tailwindcss/postcss` + `@import "tailwindcss"`, **config 파일 없음** |
| shadcn/ui | base-nova 스타일 (Base UI 기반) | `shadcn@latest`, 아이콘 lucide |
| lucide-react | 1.x | shadcn 기본 아이콘 |
| next-themes | 0.4 | 다크모드(class 전략) |

> 참고: 최초 요청은 Next.js v15였으나, 공식 툴체인(create-next-app / shadcn 최신)이
> Next 16 + Base UI를 전제로 동작하여 마찰이 발생 → 사용자 확인 후 **16으로 확정**.

## 실행 방법

```bash
npm run dev     # 개발 서버 (http://localhost:3000, Turbopack)
npm run build   # 프로덕션 빌드 (+ 타입체크)
npm run start   # 프로덕션 서버
npm run lint    # ESLint (flat config)
```

## 코드 구조

```
src/
├─ app/
│  ├─ layout.tsx        # ThemeProvider + Toaster 루트 레이아웃
│  ├─ page.tsx          # 데모 랜딩 페이지
│  └─ globals.css       # Tailwind v4 진입점 (@import "tailwindcss")
├─ components/
│  ├─ ui/               # shadcn 컴포넌트 (button, card, input, ...)
│  ├─ theme-provider.tsx
│  ├─ theme-toggle.tsx  # CSS(.dark) 기반 아이콘 전환 (effect 불필요)
│  ├─ site-header.tsx
│  └─ demo-section.tsx  # 컴포넌트 인터랙티브 데모
└─ lib/utils.ts         # cn() 헬퍼
```

## 컴포넌트 추가

```bash
npx shadcn@latest add <컴포넌트명>   # 예: dialog, tabs, table
```

## 주의사항 (Base UI 특성)

- 현재 shadcn 기본 프리미티브는 **Radix가 아니라 Base UI**(`@base-ui/react`)다.
- 다른 요소로 합성할 때 Radix의 `asChild` 대신 **`render` prop**을 쓴다.
  - 예: `<DropdownMenuTrigger render={<Button variant="outline" />}>메뉴</DropdownMenuTrigger>`
- `tailwind.config` 파일은 만들지 않는다. 테마 토큰은 `globals.css`의 `@theme`에 정의.
