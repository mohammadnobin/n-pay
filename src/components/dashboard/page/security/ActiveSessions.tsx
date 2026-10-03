"use client";
import { toast } from "sonner";
import { MonitorSmartphone, Globe, Clock, Trash2 } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { useSecurity } from "@/hooks/useSecurity";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeading } from "@/components/share/PageHeading";
import { dashboardSessions } from "@/constants/dashboard";

export function ActiveSessions() {
  const { t, lang: locale } = useLang();
  const { hydrated, revokedSessionIds, revokeSession, revokeOtherSessions } =
    useSecurity();

  if (!hydrated) return null;

  const sessions = dashboardSessions.filter(
    (session) => !revokedSessionIds.includes(session.id),
  );
  const currentId = dashboardSessions.find((s) => s.current)?.id ?? "";

  function handleRevoke(id: string) {
    revokeSession(id);
    toast.success(t("sessionRevoked"));
  }

  function handleRevokeOthers() {
    revokeOtherSessions(
      currentId,
      dashboardSessions.map((s) => s.id),
    );
    toast.success(t("allOtherSessionsRevoked"));
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeading
        eyebrow={t("securityGroupLabel")}
        title={t("activeSessionsTitle")}
        note={t("activeSessionsPageNote")}
      />

      <Button variant="outline" className="rounded-full" onClick={handleRevokeOthers}>
        {t("revokeOtherSessions")}
      </Button>

      <div className="grid gap-4 sm:grid-cols-2">
        {sessions.map((session) => (
          <Card key={session.id}>
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="icon-box bg-blue-500/10 text-blue-500">
                  <MonitorSmartphone size={18} />
                </span>
                <div className="min-w-0">
                  <p className="truncate font-semibold">{session.device}</p>
                  <p className="text-xs text-muted-foreground">
                    {session.platform}
                  </p>
                </div>
              </div>
              {session.current && (
                <Badge className="shrink-0 bg-success/10 text-success">
                  {t("currentSessionLabel")}
                </Badge>
              )}
            </div>
            <div className="mt-4 space-y-2 rounded-xl bg-muted px-4 py-3 text-xs text-muted-foreground">
              <p className="flex items-center gap-2" dir="ltr">
                <Globe size={13} className="shrink-0" />
                {t("ipLabel")} {session.ip}
              </p>
              <p className="flex items-center gap-2">
                <Clock size={13} className="shrink-0" />
                {t("lastActive", {
                  date: new Intl.DateTimeFormat(locale, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(session.lastActiveAt)),
                })}
              </p>
            </div>
            {!session.current && (
              <Button
                variant="outline"
                size="sm"
                className="mt-4 rounded-full"
                onClick={() => handleRevoke(session.id)}
              >
                <Trash2 size={15} />
                {t("revokeSessionAction")}
              </Button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
