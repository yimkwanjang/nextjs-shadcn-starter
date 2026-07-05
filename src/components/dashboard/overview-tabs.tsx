"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// 데모용 최근 주문 데이터
const orders = [
  { id: "#1024", customer: "김서연", status: "완료", amount: "₩128,000" },
  { id: "#1023", customer: "이준호", status: "처리중", amount: "₩64,500" },
  { id: "#1022", customer: "박민지", status: "완료", amount: "₩312,000" },
  { id: "#1021", customer: "정우성", status: "취소", amount: "₩0" },
  { id: "#1020", customer: "최유진", status: "처리중", amount: "₩89,900" },
];

const statusVariant: Record<string, "default" | "secondary" | "destructive"> = {
  완료: "default",
  처리중: "secondary",
  취소: "destructive",
};

// 대시보드 하단의 탭 영역(개요 · 최근 주문). Tabs는 Base UI 기반이라 클라이언트 컴포넌트다.
export function OverviewTabs() {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList>
        <TabsTrigger value="overview">개요</TabsTrigger>
        <TabsTrigger value="orders">최근 주문</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <div className="flex h-56 items-center justify-center rounded-xl border border-dashed border-border/60 bg-muted/30 text-sm text-muted-foreground">
          차트/위젯 영역 — 여기에 실제 데이터 시각화를 배치하세요.
        </div>
      </TabsContent>

      <TabsContent value="orders">
        <div className="rounded-xl border border-border/60">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>주문번호</TableHead>
                <TableHead>고객</TableHead>
                <TableHead>상태</TableHead>
                <TableHead className="text-right">금액</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[order.status]}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {order.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
    </Tabs>
  );
}
