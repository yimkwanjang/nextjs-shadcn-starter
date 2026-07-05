import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// 사용자 목록 데이터 (데모)
const users = [
  { name: "김대표", email: "ceo@example.com", role: "관리자", status: "활성" },
  { name: "이디자인", email: "design@example.com", role: "편집자", status: "활성" },
  { name: "박개발", email: "dev@example.com", role: "편집자", status: "활성" },
  { name: "최마케팅", email: "mkt@example.com", role: "읽기전용", status: "대기" },
  { name: "정인사", email: "hr@example.com", role: "읽기전용", status: "비활성" },
];

const statusVariant: Record<string, "default" | "secondary" | "outline"> = {
  활성: "default",
  대기: "secondary",
  비활성: "outline",
};

// 이름 첫 글자로 아바타 이니셜 생성
function initial(name: string) {
  return name.slice(0, 1);
}

export default function UsersPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      {/* 페이지 헤더 */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">사용자</h1>
        <p className="text-sm text-muted-foreground">
          팀 구성원과 권한을 관리하세요.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>구성원</CardTitle>
          <CardDescription>총 {users.length}명</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>이름</TableHead>
                <TableHead>이메일</TableHead>
                <TableHead>역할</TableHead>
                <TableHead className="text-right">상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.email}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="size-7">
                        <AvatarFallback className="text-xs">
                          {initial(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  <TableCell className="text-muted-foreground">{user.role}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={statusVariant[user.status] ?? "outline"}>
                      {user.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
