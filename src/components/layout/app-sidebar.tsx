import Link from "next/link";
import { Rocket } from "lucide-react";

import { NavLinks } from "@/components/layout/nav-links";

// 데스크톱 고정 사이드바 (md 이상에서만 노출).
// 모바일에서는 MobileNav의 Sheet가 동일한 NavLinks를 재사용한다.
export function AppSidebar() {
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-border/60 bg-card/40 md:flex">
      <div className="flex h-14 items-center border-b border-border/60 px-5">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Rocket className="size-5 text-primary" />
          <span>Starter Kit</span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        <NavLinks />
      </div>
    </aside>
  );
}
