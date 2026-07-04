import { Rocket } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";

// 상단 네비게이션 바
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-2 font-semibold">
          <Rocket className="size-5 text-primary" />
          <span>Starter Kit</span>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
