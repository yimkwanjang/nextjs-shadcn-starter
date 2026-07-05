import {
  LayoutDashboard,
  Settings,
  Users,
  BarChart3,
  FileText,
  type LucideIcon,
} from "lucide-react";

// 앱 셸 사이드바/모바일 내비게이션이 공유하는 메뉴 정의
export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
};

// 주요 내비게이션 (대시보드 영역)
export const mainNav: NavItem[] = [
  { title: "대시보드", href: "/dashboard", icon: LayoutDashboard },
  { title: "분석", href: "/dashboard/analytics", icon: BarChart3 },
  { title: "문서", href: "/dashboard/documents", icon: FileText },
  { title: "사용자", href: "/dashboard/users", icon: Users },
  { title: "설정", href: "/settings", icon: Settings },
];

// 경로 → 한글 라벨 매핑 (브레드크럼용)
export const routeLabels: Record<string, string> = {
  dashboard: "대시보드",
  analytics: "분석",
  documents: "문서",
  users: "사용자",
  settings: "설정",
};
