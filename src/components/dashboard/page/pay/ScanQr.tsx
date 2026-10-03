"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ScanLine, ArrowRight } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeading } from "@/components/share/PageHeading";
import { PayStepper } from "./PayStepper";
import { QRScanner } from "./QRScanner";
import { dashboardMerchant } from "@/constants/dashboard";
import { routes } from "@/constants/routes";

export function ScanQr() {
  const { t } = useLang();
  const router = useRouter();
  const [code, setCode] = useState("");
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeading
        eyebrow={t("navPay")}
        title={t("scanTitlePage")}
        note={t("scanNotePage")}
      />
      <PayStepper current={0} />
      <Card className="space-y-6">
        <span className="icon-box bg-accent text-primary">
          <ScanLine size={23} />
        </span>
        <div>
          <h2 className="section-title">{t("qrTitle")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t("qrNote")}</p>
        </div>
        <QRScanner onDecode={setCode} />
        <div>
          <label htmlFor="qr" className="field-label">
            {t("qrLabel")}
          </label>
          <Input
            id="qr"
            dir="ltr"
            placeholder={dashboardMerchant.code}
            value={code}
            onChange={(event) => setCode(event.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="secondary"
            className="rounded-full"
            onClick={() => setCode(dashboardMerchant.code)}
          >
            {t("useSample")}
          </Button>
          <Button
            className="flex-1 rounded-full"
            disabled={code.trim().length < 3}
            onClick={() => router.push(routes.payMerchant)}
          >
            {t("findMerchant")}
            <ArrowRight size={17} className="rtl:rotate-180" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
