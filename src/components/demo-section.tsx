"use client";

import * as React from "react";
import { Bell, Check, ChevronDown } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// 스타터 킷에 포함된 UI 컴포넌트를 시연하는 인터랙티브 섹션
export function DemoSection() {
  const [name, setName] = React.useState("");

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {/* 폼 + 토스트 데모 */}
      <Card>
        <CardHeader>
          <CardTitle>폼 &amp; 토스트</CardTitle>
          <CardDescription>Input · Label · Button · Sonner</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              placeholder="이름을 입력하세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={() =>
              toast.success(
                name ? `${name}님, 환영합니다!` : "환영합니다!",
                { description: "Sonner 토스트가 정상 동작합니다." },
              )
            }
          >
            <Bell className="size-4" />
            토스트 띄우기
          </Button>
        </CardFooter>
      </Card>

      {/* 버튼 변형 + 드롭다운 데모 */}
      <Card>
        <CardHeader>
          <CardTitle>버튼 &amp; 드롭다운</CardTitle>
          <CardDescription>Button 변형 · DropdownMenu · Badge</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button size="sm">Default</Button>
            <Button size="sm" variant="secondary">
              Secondary
            </Button>
            <Button size="sm" variant="outline">
              Outline
            </Button>
            <Button size="sm" variant="destructive">
              Destructive
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" />}>
                메뉴 열기 <ChevronDown className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>내 계정</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Check className="size-4" /> 프로필
                </DropdownMenuItem>
                <DropdownMenuItem>설정</DropdownMenuItem>
                <DropdownMenuItem variant="destructive">
                  로그아웃
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Badge>New</Badge>
            <Badge variant="secondary">v15</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
