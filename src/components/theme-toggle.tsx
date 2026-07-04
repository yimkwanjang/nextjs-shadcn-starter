"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

// 라이트/다크 테마를 전환하는 토글 버튼
// 두 아이콘을 모두 렌더링하고 CSS(.dark 클래스)로 전환하므로
// 하이드레이션 불일치가 없고 useEffect도 필요 없다.
export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  const toggle = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggle}
      aria-label="테마 전환"
    >
      <Sun className="size-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute size-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">테마 전환</span>
    </Button>
  );
}
