"use client";

import * as React from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

// 알림 스위치 항목 정의
const notifications = [
  { id: "email", label: "이메일 알림", desc: "주요 활동을 이메일로 받습니다." },
  { id: "push", label: "푸시 알림", desc: "브라우저 푸시 알림을 받습니다." },
  { id: "weekly", label: "주간 리포트", desc: "매주 요약 리포트를 받습니다." },
];

// 설정 폼: 프로필 · 알림 탭. 저장 시 sonner 토스트로 피드백.
export function SettingsForm() {
  function handleSave(event: React.FormEvent) {
    event.preventDefault();
    toast.success("설정이 저장되었습니다.");
  }

  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList>
        <TabsTrigger value="profile">프로필</TabsTrigger>
        <TabsTrigger value="notifications">알림</TabsTrigger>
      </TabsList>

      {/* 프로필 탭 */}
      <TabsContent value="profile">
        <Card>
          <form onSubmit={handleSave}>
            <CardHeader>
              <CardTitle>프로필</CardTitle>
              <CardDescription>
                공개 프로필 정보를 수정합니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">이름</Label>
                <Input id="name" defaultValue="스타터 유저" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="bio">소개</Label>
                <Textarea
                  id="bio"
                  rows={3}
                  defaultValue="한 줄 소개를 입력하세요."
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>역할</Label>
                <Select defaultValue="편집자">
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="관리자">관리자</SelectItem>
                    <SelectItem value="편집자">편집자</SelectItem>
                    <SelectItem value="뷰어">뷰어</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">변경사항 저장</Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>

      {/* 알림 탭 */}
      <TabsContent value="notifications">
        <Card>
          <form onSubmit={handleSave}>
            <CardHeader>
              <CardTitle>알림</CardTitle>
              <CardDescription>알림 수신 방식을 설정합니다.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
              {notifications.map((item, index) => (
                <React.Fragment key={item.id}>
                  {index > 0 && <Separator className="my-1" />}
                  <div className="flex items-center justify-between gap-4 py-1">
                    <div className="flex flex-col">
                      <Label htmlFor={item.id}>{item.label}</Label>
                      <span className="text-xs text-muted-foreground">
                        {item.desc}
                      </span>
                    </div>
                    <Switch id={item.id} defaultChecked={index === 0} />
                  </div>
                </React.Fragment>
              ))}
            </CardContent>
            <CardFooter>
              <Button type="submit">변경사항 저장</Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
