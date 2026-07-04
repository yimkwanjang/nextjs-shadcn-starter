# WORKLOG — Next.js Starter Kit

## 개요
웹 개발을 빠르게 시작하기 위한 스타터 킷. 요청 스택: Next.js App Router · TypeScript ·
TailwindCSS v4(config 파일 없음) · shadcn/ui · lucide-react.

## 아키텍처
- Next.js 16 App Router + Turbopack, `src/` 디렉토리 구조, `@/*` import alias
- Tailwind v4: PostCSS 플러그인(`@tailwindcss/postcss`) 방식, `globals.css`에서 `@import "tailwindcss"`
- shadcn/ui(base-nova, Base UI 기반) + lucide 아이콘
- 다크모드: next-themes(class 전략) + shadcn 토글 패턴

## 작업 이력

### 2026-07-04
1. `create-next-app@latest`로 스캐폴딩 → **Next 16** 설치됨(요청은 v15).
2. 1차: 요청대로 `next@^15`로 다운그레이드.
3. shadcn init(base-nova) + 컴포넌트 추가(button, card, input, label, badge,
   dropdown-menu, sonner), next-themes 추가.
4. layout/page/데모 컴포넌트 작성.
5. **공식문서 대조 검토** 중 빌드 실패 2건 발견:
   - ESLint 불일치: Next15 다운그레이드 ↔ Next16용 flat config(`core-web-vitals` 서브패스)
   - `asChild` 타입 오류: shadcn 기본이 Radix→**Base UI** 전환됨(`render` prop 사용)
6. 근본 원인=최신 툴체인이 Next16+Base UI 전제 → 사용자 확인 후 **Next 16으로 확정**.
7. 수정: next/eslint-config-next 최신 복귀, 데모의 `asChild`→`render` prop,
   theme-toggle을 effect 없는 CSS 전환 패턴으로 개선(react-hooks 린트 대응).
8. **검증 완료**: `npm run build` ✓, `npm run lint` ✓(0 error), dev 서버 HTTP 200 + 콘텐츠 렌더 확인.

## 공식문서 검토 결과 (최종)
- Next.js: `create-next-app@latest` 기본값(16, Turbopack, src, @/*) 준수 ✅
- TailwindCSS: v4 공식 Next 가이드(포스트CSS 플러그인, config 파일 없음) 완전 준수 ✅
- shadcn/ui: `shadcn@latest` 기본(Base UI, lucide) 준수 ✅
- TypeScript / lucide-react: 내장·기본 준수 ✅

## 관리 명령어
```bash
npm run dev / build / start / lint
npx shadcn@latest add <컴포넌트>
```
