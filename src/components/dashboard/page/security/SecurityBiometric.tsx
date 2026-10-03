"use client";
import Link from "next/link";
import {
  Lock,
  KeyRound,
  Fingerprint,
  ShieldCheck,
  Smartphone,
  Bell,
  Trash2,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { useSecurity } from "@/hooks/useSecurity";
import { Card } from "@/components/ui/card";
import { PageHeading } from "@/components/share/PageHeading";
import { routes } from "@/constants/routes";
import { cn } from "@/lib/utils";

function SettingsRow({
  icon: Icon,
  tone,
  title,
  note,
  href,
  chevron = true,
  danger = false,
}: {
  icon: LucideIcon;
  tone: string;
  title: string;
  note: string;
  href?: string;
  chevron?: boolean;
  danger?: boolean;
}) {
  const content = (
    <>
      <span className={cn("icon-box", tone)}>
        <Icon size={18} />
      </span>
      <div className="min-w-0 flex-1">
        <p className={cn("text-sm font-semibold", danger && "text-danger")}>
          {title}
        </p>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">{note}</p>
      </div>
      {chevron && (
        <ChevronRight
          size={18}
          className="ms-auto shrink-0 text-muted-foreground rtl:rotate-180"
        />
      )}
    </>
  );
  return (
    <li>
      {href ? (
        <Link
          href={href}
          className="flex items-center gap-4 border-b border-border px-6 py-4 transition-colors last:border-b-0 hover:bg-muted/40"
        >
          {content}
        </Link>
      ) : (
        <div className="flex items-center gap-4 border-b border-border px-6 py-4 last:border-b-0">
          {content}
        </div>
      )}
    </li>
  );
}

export function SecurityBiometric() {
  const { t } = useLang();
  const { hydrated, pinSet, twoFactorEnabled } = useSecurity();
  if (!hydrated) return null;
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeading
        title={t("securityCenterTitle")}
        note={t("securityCenterNote")}
      />

      <section>
        <p className="eyebrow mb-3 px-1">{t("securityGroupLabel")}</p>
        <Card className="p-0">
          <ul>
            <SettingsRow
              icon={Lock}
              tone="bg-blue-500/10 text-blue-500"
              title={t("changePasswordTitle")}
              note={t("changePasswordNote")}
              href={routes.changePassword}
            />
            <SettingsRow
              icon={KeyRound}
              tone={
                pinSet
                  ? "bg-success/10 text-success"
                  : "bg-orange-500/10 text-orange-500"
              }
              title={t("transactionPinTitle")}
              note={t(pinSet ? "pinSetStatus" : "transactionPinNote")}
              href={routes.transactionPin}
            />
            <SettingsRow
              icon={Fingerprint}
              tone="bg-muted text-muted-foreground"
              title={t("biometricAppLockTitle")}
              note={t("biometricAppLockNote")}
              chevron={false}
            />
            <SettingsRow
              icon={ShieldCheck}
              tone={
                twoFactorEnabled
                  ? "bg-success/10 text-success"
                  : "bg-orange-500/10 text-orange-500"
              }
              title={t("twoFactorTitle")}
              note={t(twoFactorEnabled ? "twoFactorEnabledStatus" : "twoFactorNote")}
              href={routes.twoFactor}
            />
            <SettingsRow
              icon={Smartphone}
              tone="bg-violet-500/10 text-violet-500"
              title={t("activeSessionsTitle")}
              note={t("activeSessionsNote")}
              href={routes.activeSessions}
            />
          </ul>
        </Card>
      </section>

      <section>
        <p className="eyebrow mb-3 px-1">{t("preferencesGroupLabel")}</p>
        <Card className="p-0">
          <ul>
            <SettingsRow
              icon={Bell}
              tone="bg-rose-500/10 text-rose-500"
              title={t("notificationsTitle")}
              note={t("notificationsNote")}
            />
          </ul>
        </Card>
      </section>

      <section>
        <p className="eyebrow mb-3 px-1">{t("dangerZoneLabel")}</p>
        <Card className="p-0">
          <ul>
            <SettingsRow
              icon={Trash2}
              tone="bg-danger/10 text-danger"
              title={t("deleteAccountTitle")}
              note={t("deleteAccountNote")}
              href={routes.deleteAccount}
              danger
            />
          </ul>
        </Card>
      </section>
    </div>
  );
}
