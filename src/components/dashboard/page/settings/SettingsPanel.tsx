"use client";
import Link from "next/link";
import {
  BadgeCheck,
  ChevronRight,
  Languages,
  LogOut,
  ShieldCheck,
  UserRound,
  Wallet,
} from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/share/PageHeading";
import { Preferences } from "@/components/share/Preferences";
import { routes } from "@/constants/routes";

const LINKS = [
  [UserRound, "navProfile", routes.profile],
  [Wallet, "navWallet", routes.wallet],
  [ShieldCheck, "navSecurity", routes.security],
  [BadgeCheck, "navKyc", routes.kyc],
] as const;

export function SettingsPanel() {
  const { t } = useLang();
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeading
        eyebrow={t("navSettings")}
        title={t("settingsTitle")}
        note={t("settingsNote")}
      />

      <Card>
        <h2 className="section-title flex items-center gap-2">
          <Languages size={18} className="text-primary" />
          {t("appearance")}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("appearanceNote")}
        </p>
        <div className="mt-5 max-w-sm">
          <Preferences />
        </div>
      </Card>

      <Card className="p-0">
        <ul>
          {LINKS.map(([Icon, key, href]) => (
            <li key={key}>
              <Link
                href={href}
                className="flex items-center gap-4 border-b border-border px-6 py-4 transition-colors last:border-b-0 hover:bg-muted/40"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                  <Icon size={19} />
                </span>
                <span className="text-sm font-medium">{t(key)}</span>
                <ChevronRight
                  size={18}
                  className="ms-auto text-muted-foreground rtl:rotate-180"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0">
          <h2 className="section-title">{t("logout")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("logoutNote")}
          </p>
        </div>
        <Button
          variant="outline"
          className="rounded-full border-danger/25 text-danger hover:bg-danger/10"
        >
          <LogOut size={16} />
          {t("logout")}
        </Button>
      </Card>
    </div>
  );
}
