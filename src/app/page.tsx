import { Blocks, Palette, Sparkles, Type } from "lucide-react";

import { DemoSection } from "@/components/demo-section";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";

const stack = [
  { icon: Blocks, label: "Next.js 15", desc: "App Router" },
  { icon: Type, label: "TypeScript", desc: "타입 안전성" },
  { icon: Palette, label: "TailwindCSS v4", desc: "설정 파일 불필요" },
  { icon: Sparkles, label: "shadcn/ui", desc: "lucide-react 아이콘" },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 sm:py-16">
        {/* 히어로 */}
        <section className="mb-14 text-center">
          <Badge variant="secondary" className="mb-4">
            빠르게 시작하는 웹 개발
          </Badge>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Next.js Starter Kit
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-balance text-muted-foreground">
            프로덕션에 바로 투입 가능한 모던 웹 스택. 설정은 끝났으니 기능 구현에만
            집중하세요.
          </p>
        </section>

        {/* 기술 스택 */}
        <section className="mb-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stack.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 rounded-xl border border-border/60 bg-card p-5 text-center"
            >
              <Icon className="size-6 text-primary" />
              <div className="font-medium">{label}</div>
              <div className="text-xs text-muted-foreground">{desc}</div>
            </div>
          ))}
        </section>

        {/* 컴포넌트 데모 */}
        <section>
          <h2 className="mb-4 text-lg font-semibold">컴포넌트 데모</h2>
          <DemoSection />
        </section>
      </main>

      <footer className="border-t border-border/60 py-6 text-center text-sm text-muted-foreground">
        Next.js 15 · TypeScript · TailwindCSS v4 · shadcn/ui · lucide-react
      </footer>
    </>
  );
}
