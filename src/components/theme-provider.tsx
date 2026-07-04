"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// 앱 전역 테마(라이트/다크) 상태를 관리하는 프로바이더
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
