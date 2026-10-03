"use client";
import { useState } from "react";
import { toast } from "sonner";
import {
  Coffee,
  ShoppingBag,
  Car,
  Building2,
  Copy,
  Check,
  Loader2,
  Circle,
  X as XIcon,
} from "lucide-react";
import { useLang } from "@/hooks/useLang";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { StatusBadge } from "@/components/share/StatusBadge";
import { cn, money } from "@/lib/utils";
import type { Transaction } from "@/types";

const icons = {
  dining: Coffee,
  shopping: ShoppingBag,
  travel: Car,
  stay: Building2,
};

const CATEGORY_TONES: Record<Transaction["category"], string> = {
  dining: "bg-orange-500/10 text-orange-500",
  shopping: "bg-violet-500/10 text-violet-500",
  travel: "bg-blue-500/10 text-blue-500",
  stay: "bg-emerald-500/10 text-emerald-500",
};

const ASSET_NETWORKS: Record<string, string> = {
  USDC: "Ethereum",
  USDT: "Ethereum",
  SOL: "Solana",
  ADA: "Cardano",
};

const STAGE_KEYS = [
  "stageSubmitted",
  "stageSigned",
  "stageBroadcast",
  "stageSettled",
] as const;

type StageState = "done" | "active" | "waiting" | "failed";

const STATUS_STAGES: Record<Transaction["status"], StageState[]> = {
  completed: ["done", "done", "done", "done"],
  pending: ["done", "done", "active", "waiting"],
  failed: ["done", "done", "failed", "waiting"],
};

export function TransactionTable({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const { t, lang: locale } = useLang();
  const [selected, setSelected] = useState<Transaction | null>(null);

  if (!transactions.length)
    return (
      <div className="p-12 text-center">
        <p className="font-semibold">{t("noTransactions")}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("noTransactionsNote")}
        </p>
      </div>
    );

  function copyReference(reference: string) {
    navigator.clipboard
      .writeText(reference)
      .then(() => toast.success(t("copied")))
      .catch(() => toast.error(t("requestFailed")));
  }

  return (
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>{t("merchantLabel")}</th>
            <th>{t("date")}</th>
            <th>{t("status")}</th>
            <th>
              <span className="flex justify-end">{t("amount")}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => {
            const Icon = icons[tx.category];
            return (
              <tr
                key={tx.id}
                role="button"
                tabIndex={0}
                aria-label={`${t("paymentDetails")}: ${tx.id}`}
                onClick={() => setSelected(tx)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelected(tx);
                  }
                }}
                className="cursor-pointer hover:bg-muted/30"
              >
                <td>
                  <div className="flex items-center gap-3">
                    <div className="icon-box rounded-full">
                      <Icon size={18} className="text-muted-foreground" />
                    </div>
                    <div className="font-medium">
                      {tx.merchant}
                      <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                        {tx.id}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="text-muted-foreground">
                  {new Intl.DateTimeFormat(locale, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    timeZone: "Asia/Thimphu",
                  }).format(new Date(tx.date))}
                </td>
                <td>
                  <StatusBadge status={tx.status} />
                </td>
                <td className="text-end">
                  <span dir="ltr" className="font-semibold">
                    {tx.amount.toFixed(2)} {tx.asset}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {money(tx.fiatAmount, locale, "BTN")}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Dialog
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        {selected &&
          (() => {
            const CategoryIcon = icons[selected.category];
            const rate = selected.fiatAmount / selected.amount;
            const stages = STATUS_STAGES[selected.status];
            return (
              <DialogContent className="max-w-lg">
                <div className="flex items-start gap-4 pe-8">
                  <span
                    className={cn(
                      "flex size-12 shrink-0 items-center justify-center rounded-2xl",
                      CATEGORY_TONES[selected.category],
                    )}
                  >
                    <CategoryIcon size={22} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <DialogTitle className="truncate text-lg font-bold">
                          {selected.merchant}
                        </DialogTitle>
                        <DialogDescription
                          className="mt-0.5 truncate text-xs text-muted-foreground"
                          dir="ltr"
                        >
                          {selected.id}
                        </DialogDescription>
                      </div>
                      <StatusBadge status={selected.status} />
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl bg-muted/50 p-5 text-center">
                  <p className="text-3xl font-bold" dir="ltr">
                    {selected.amount.toFixed(2)} {selected.asset}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground" dir="ltr">
                    ≈ {money(selected.fiatAmount, locale, "BTN")}
                  </p>
                </div>

                <ol className="mt-6 grid grid-cols-4 gap-2">
                  {STAGE_KEYS.map((key, i) => {
                    const state = stages[i];
                    return (
                      <li key={key} className="text-center">
                        <span
                          className={cn(
                            "mx-auto flex size-7 items-center justify-center rounded-full",
                            state === "done"
                              ? "bg-success/15 text-success"
                              : state === "active"
                                ? "bg-primary/15 text-primary"
                                : state === "failed"
                                  ? "bg-danger/15 text-danger"
                                  : "bg-muted text-muted-foreground",
                          )}
                        >
                          {state === "done" ? (
                            <Check size={13} strokeWidth={3} />
                          ) : state === "active" ? (
                            <Loader2 size={13} className="animate-spin" />
                          ) : state === "failed" ? (
                            <XIcon size={13} strokeWidth={3} />
                          ) : (
                            <Circle size={8} />
                          )}
                        </span>
                        <p
                          className={cn(
                            "mt-1.5 text-[11px] leading-tight",
                            state === "waiting"
                              ? "text-muted-foreground"
                              : "font-medium text-foreground",
                          )}
                        >
                          {t(key)}
                        </p>
                      </li>
                    );
                  })}
                </ol>

                <dl className="mt-6 space-y-4 text-sm">
                  <div className="flex justify-between gap-5 border-t border-border pt-4">
                    <dt className="text-muted-foreground">{t("reference")}</dt>
                    <dd
                      className="flex items-center gap-2 text-end font-medium"
                      dir="ltr"
                    >
                      {selected.reference}
                      <button
                        type="button"
                        onClick={() => copyReference(selected.reference)}
                        aria-label={t("copyToClipboard")}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Copy size={14} />
                      </button>
                    </dd>
                  </div>
                  <div className="flex justify-between gap-5 border-t border-border pt-4">
                    <dt className="text-muted-foreground">
                      {t("merchantLabel")}
                    </dt>
                    <dd className="text-end font-medium">
                      {selected.merchant}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-5 border-t border-border pt-4">
                    <dt className="text-muted-foreground">
                      {t("merchantCategory")}
                    </dt>
                    <dd className="text-end font-medium">
                      {t(selected.category)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-5 border-t border-border pt-4">
                    <dt className="text-muted-foreground">{t("network")}</dt>
                    <dd className="text-end font-medium">
                      {ASSET_NETWORKS[selected.asset] ?? selected.asset}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-5 border-t border-border pt-4">
                    <dt className="text-muted-foreground">{t("rate")}</dt>
                    <dd className="text-end font-medium" dir="ltr">
                      1 {selected.asset} ≈ {money(rate, locale, "BTN")}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-5 border-t border-border pt-4">
                    <dt className="text-muted-foreground">{t("date")}</dt>
                    <dd className="text-end font-medium" dir="ltr">
                      {new Intl.DateTimeFormat(locale, {
                        dateStyle: "medium",
                        timeStyle: "short",
                        timeZone: "Asia/Thimphu",
                      }).format(new Date(selected.date))}
                    </dd>
                  </div>
                </dl>

                {selected.status === "pending" && (
                  <p className="mt-6 text-xs leading-6 text-muted-foreground">
                    {t("helpPendingCopy")}
                  </p>
                )}
              </DialogContent>
            );
          })()}
      </Dialog>
    </div>
  );
}
