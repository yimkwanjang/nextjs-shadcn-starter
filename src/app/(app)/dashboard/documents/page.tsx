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

// 문서 목록 데이터 (데모)
const documents = [
  { name: "2026 사업 계획서", type: "PDF", owner: "김대표", status: "승인", updated: "2026-06-28" },
  { name: "브랜드 가이드라인", type: "Figma", owner: "이디자인", status: "검토중", updated: "2026-06-25" },
  { name: "API 명세서 v2", type: "Markdown", owner: "박개발", status: "승인", updated: "2026-06-20" },
  { name: "마케팅 성과 리포트", type: "Sheet", owner: "최마케팅", status: "초안", updated: "2026-06-18" },
  { name: "채용 공고 템플릿", type: "Docs", owner: "정인사", status: "승인", updated: "2026-06-11" },
];

const statusVariant: Record<string, "default" | "secondary" | "outline"> = {
  승인: "default",
  검토중: "secondary",
  초안: "outline",
};

export default function DocumentsPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      {/* 페이지 헤더 */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">문서</h1>
        <p className="text-sm text-muted-foreground">
          팀이 작업 중인 문서를 관리하세요.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>전체 문서</CardTitle>
          <CardDescription>총 {documents.length}개의 문서</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>이름</TableHead>
                <TableHead>유형</TableHead>
                <TableHead>소유자</TableHead>
                <TableHead>상태</TableHead>
                <TableHead className="text-right">수정일</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.name}>
                  <TableCell className="font-medium">{doc.name}</TableCell>
                  <TableCell className="text-muted-foreground">{doc.type}</TableCell>
                  <TableCell className="text-muted-foreground">{doc.owner}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[doc.status] ?? "outline"}>
                      {doc.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {doc.updated}
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
