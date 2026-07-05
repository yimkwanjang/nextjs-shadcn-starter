import { SettingsForm } from "@/components/settings/settings-form";

export default function SettingsPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">설정</h1>
        <p className="text-sm text-muted-foreground">
          계정 및 알림 환경을 관리합니다.
        </p>
      </div>
      <SettingsForm />
    </div>
  );
}
