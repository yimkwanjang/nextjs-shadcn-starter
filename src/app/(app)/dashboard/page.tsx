import { ArrowUpRight, DollarSign, Users, Activity, Percent } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OverviewTabs } from "@/components/dashboard/overview-tabs";

// 대시보드 통계 카드 데이터 (데모)
const stats = [
  { label: "총 매출", value: "₩12.4M", trend: "+12.5%", icon: DollarSign },
  { label: "신규 사용자", value: "1,240", trend: "+8.2%", icon: Users },
  { label: "활성 세션", value: "342", trend: "+3.1%", icon: Activity },
  { label: "전환율", value: "3.6%", trend: "+0.4%", icon: Percent },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      {/* 페이지 헤더 */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">대시보드</h1>
          <p className="text-sm text-muted-foreground">
            서비스 핵심 지표를 한눈에 확인하세요.
          </p>
        </div>
        <Button>
          새로 만들기
          <ArrowUpRight className="size-4" />
        </Button>
      </div>

      {/* 통계 카드 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, trend, icon: Icon }) => (
          <Card key={label}>
            <CardHeader>
              <CardDescription>{label}</CardDescription>
              <CardTitle className="text-2xl">{value}</CardTitle>
              <Icon className="size-5 self-start text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Badge variant="secondary" className="gap-1">
                <ArrowUpRight className="size-3" />
                {trend}
              </Badge>
              <span className="ml-2 text-xs text-muted-foreground">
                지난달 대비
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 탭 영역 */}
      <OverviewTabs />
    </div>
  );
}
