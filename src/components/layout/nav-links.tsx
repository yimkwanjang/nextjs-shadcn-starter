"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { mainNav } from "@/components/layout/nav-config";

// 사이드바·모바일 시트가 공유하는 내비게이션 링크 목록.
// 현재 경로를 usePathname으로 읽어 활성 항목을 강조한다.
export function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {mainNav.map(({ title, href, icon: Icon }) => {
        // 정확히 일치하거나 하위 경로일 때 활성 처리
        const active =
          pathname === href ||
          (href !== "/dashboard" && pathname.startsWith(href)) ||
          (href === "/dashboard" && pathname === "/dashboard");

        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              buttonVariants({ variant: active ? "secondary" : "ghost" }),
              "h-9 justify-start gap-2.5 px-3 font-normal",
              active && "font-medium",
            )}
          >
            <Icon className="size-4 shrink-0" />
            {title}
          </Link>
        );
      })}
    </nav>
  );
}
