import Link from "next/link";
import { Rocket } from "lucide-react";

// 인증 영역 공용 레이아웃: 카드 하나를 화면 중앙에 배치.
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <Link
        href="/"
        className="mb-8 flex items-center gap-2 text-lg font-semibold"
      >
        <Rocket className="size-6 text-primary" />
        Starter Kit
      </Link>
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
