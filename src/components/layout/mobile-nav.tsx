"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Rocket } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavLinks } from "@/components/layout/nav-links";

// 모바일(md 미만)에서 햄버거 버튼으로 여는 내비게이션 드로어.
// 링크 클릭 시 onNavigate로 시트를 닫는다.
export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" className="md:hidden" />
        }
      >
        <Menu className="size-5" />
        <span className="sr-only">메뉴 열기</span>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <SheetHeader className="h-14 justify-center border-b border-border/60 px-5">
          <SheetTitle
            render={
              <Link href="/" onClick={() => setOpen(false)} />
            }
            className="flex items-center gap-2 font-semibold"
          >
            <Rocket className="size-5 text-primary" />
            Starter Kit
          </SheetTitle>
        </SheetHeader>
        <div className="p-3">
          <NavLinks onNavigate={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
