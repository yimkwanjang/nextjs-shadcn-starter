"use client";

import * as React from "react";
import Link from "next/link";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    toast.success("로그인 요청이 전송되었습니다. (데모)");
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-xl">로그인</CardTitle>
          <CardDescription>
            이메일과 비밀번호로 계정에 접속하세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">비밀번호</Label>
              <Link
                href="#"
                className="text-xs text-muted-foreground underline-offset-4 hover:underline"
              >
                비밀번호 찾기
              </Link>
            </div>
            <Input id="password" type="password" required />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember" className="font-normal">
              로그인 상태 유지
            </Label>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button type="submit" className="w-full">
            로그인
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            계정이 없으신가요?{" "}
            <Link
              href="#"
              className="text-foreground underline-offset-4 hover:underline"
            >
              회원가입
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
