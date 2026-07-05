import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppHeader } from "@/components/layout/app-header";
import { SiteFooter } from "@/components/layout/site-footer";

// 대시보드 영역 공용 레이아웃(앱 셸): 사이드바 + 헤더 + 콘텐츠 + 푸터.
// (app) 라우트 그룹은 URL에 영향을 주지 않으므로 /dashboard, /settings 등이 이 셸을 공유한다.
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
        <SiteFooter />
      </div>
    </div>
  );
}
