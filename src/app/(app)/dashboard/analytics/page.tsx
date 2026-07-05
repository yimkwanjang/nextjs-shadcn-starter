import { BarChart3, TrendingUp, Eye, MousePointerClick } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// 분석 지표 카드 데이터 (데모)
const metrics = [
  { label: "페이지뷰", value: "48.2K", trend: "+6.4%", icon: Eye },
  { label: "방문자", value: "12.1K", trend: "+3.9%", icon: TrendingUp },
  { label: "클릭수", value: "8,420", trend: "+2.1%", icon: MousePointerClick },
  { label: "평균 세션", value: "3m 12s", trend: "+0.8%", icon: BarChart3 },
];

export default function AnalyticsPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      {/* 페이지 헤더 */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">분석</h1>
        <p className="text-sm text-muted-foreground">
          트래픽과 사용자 행동 지표를 확인하세요.
        </p>
      </div>

      {/* 지표 카드 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map(({ label, value, trend, icon: Icon }) => (
          <Card key={label}>
            <CardHeader>
              <CardDescription>{label}</CardDescription>
              <CardTitle className="text-2xl">{value}</CardTitle>
              <Icon className="size-5 self-start text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Badge variant="secondary" className="gap-1">
                <TrendingUp className="size-3" />
                {trend}
              </Badge>
              <span className="ml-2 text-xs text-muted-foreground">
                지난주 대비
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 차트 자리 표시 */}
      <Card>
        <CardHeader>
          <CardTitle>트래픽 추이</CardTitle>
          <CardDescription>최근 30일 방문자 흐름</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-64 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
            차트 영역 — 여기에 실제 데이터 시각화를 배치하세요.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
