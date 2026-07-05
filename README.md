# Next.js × shadcn/ui 스타터 킷

포트폴리오 프로젝트를 **빠르게 시작**하기 위한 웹 개발 스타터 킷입니다.
레이아웃·다크모드·폼 컴포넌트 등 초기 세팅이 끝나 있어, 곧바로 기능 구현에 집중할 수 있습니다.

> 저장소: <https://github.com/johndoe/nextjs-shadcn-starter>

## ✨ 주요 기능

- **기본 레이아웃** — 라우트 그룹으로 분리한 앱 셸(사이드바 + 헤더 + 브레드크럼 + 푸터)과 인증 셸
- **다크모드** — `next-themes` 기반 라이트/다크/시스템 테마 전환
- **shadcn/ui 폼 컴포넌트 예제** — Input · Button · Select · Switch · Dialog · Table 등 데모 페이지 제공
- **대시보드 예제** — 지표 카드, 분석·문서·사용자 서브 페이지

## 🧱 기술 스택

| 스택 | 버전 | 비고 |
|------|------|------|
| Next.js | 16.2.10 | App Router, Turbopack 기본 |
| React | 19.2 | Next 16 내장 |
| TypeScript | 5 | 타입 안전성 |
| Tailwind CSS | v4 | 설정 파일 없음(PostCSS 플러그인 방식) |
| shadcn/ui | base-nova (Base UI 기반) | 아이콘 `lucide-react` |
| next-themes | 0.4 | 다크모드 class 전략 |

> ℹ️ 초기 기획은 Next.js 15였으나, 최신 공식 툴체인(`create-next-app` / `shadcn`)이
> Next 16 + Base UI를 전제로 동작해 **16으로 확정**했습니다.

## 🚀 시작하기

```bash
# 1. 저장소 클론
git clone https://github.com/johndoe/nextjs-shadcn-starter.git
cd nextjs-shadcn-starter

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
npm run dev
```

[http://localhost:3000](http://localhost:3000) 을 브라우저에서 열면 결과를 확인할 수 있습니다.

## 📜 스크립트

```bash
npm run dev     # 개발 서버 (Turbopack)
npm run build   # 프로덕션 빌드 (컴파일 + 타입체크)
npm run start   # 프로덕션 서버
npm run lint    # ESLint (flat config)

npx shadcn@latest add <컴포넌트명>   # UI 컴포넌트 추가 (예: dialog, tabs, table)
```

## 📁 프로젝트 구조

```
src/
├── app/
│   ├── (app)/            # 대시보드 앱 셸 (사이드바+헤더+푸터)
│   │   ├── dashboard/     # 대시보드 · 분석 · 문서 · 사용자
│   │   └── settings/      # 설정
│   ├── (auth)/           # 중앙 정렬 인증 셸
│   │   └── login/         # 로그인
│   ├── layout.tsx         # 루트 레이아웃 (ThemeProvider, Toaster)
│   └── page.tsx           # 랜딩 페이지
├── components/
│   ├── ui/                # shadcn/ui 컴포넌트
│   ├── layout/            # 앱 셸 조각 (사이드바, 헤더, 내비게이션)
│   ├── dashboard/         # 대시보드 위젯
│   └── settings/          # 설정 폼
└── lib/                   # 유틸리티 (cn 등)
```

- **라우트 그룹**: `(app)` / `(auth)` 는 URL에 영향을 주지 않고 각자의 셸을 정의합니다.
- **경로 alias**: `@/*` → `src/*`
- **테마 토큰**: Tailwind v4 설정 파일이 없으므로 `src/app/globals.css` 의 `@theme` 블록에서 관리합니다.

## 📄 라이선스

MIT
