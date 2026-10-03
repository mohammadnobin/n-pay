"use client";
import { useState } from "react";
import { Search, Download } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ActivityFilterTabs,
  type ActivityFilter,
} from "@/components/share/ActivityFilterTabs";
import { PageHeading } from "@/components/share/PageHeading";
import { TransactionTable } from "./TransactionTable";
import { dashboardTransactions } from "@/constants/dashboard";
import type { Transaction } from "@/types";

export function exportTransactions(rows: Transaction[]) {
  const escape = (v: string) =>
    '"' + v.replace(/^[=+@-]/, "'$&").replaceAll('"', '""') + '"';
  const csv = [
    [
      "reference",
      "merchant",
      "date",
      "asset",
      "amount",
      "fiatAmount",
      "status",
    ],
    ...rows.map((tx) => [
      tx.id,
      tx.merchant,
      tx.date,
      tx.asset,
      String(tx.amount),
      String(tx.fiatAmount),
      tx.status,
    ]),
  ]
    .map((row) => row.map(escape).join(","))
    .join("\r\n");
  const url = URL.createObjectURL(
    new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = "nomipay-transactions.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export function TransactionHistory() {
  const { t } = useLang();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ActivityFilter>("all");
  const filtered = dashboardTransactions.filter(
    (tx) =>
      (status === "all" || tx.status === status) &&
      `${tx.merchant} ${tx.id} ${tx.reference}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  return (
    <div className="space-y-6">
      <PageHeading
        eyebrow={t("navTransactions")}
        title={t("historyTitle")}
        note={t("historyNote")}
      />
      <div className="flex flex-wrap gap-3">
        <div className="relative w-full min-w-50 sm:max-w-xs">
          <Search
            size={18}
            className="absolute start-4 top-3.5 text-muted-foreground"
          />
          <Input
            className="rounded-full bg-card ps-11"
            aria-label={t("search")}
            placeholder={t("search")}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div className="ms-auto flex flex-wrap gap-3">
          <ActivityFilterTabs
            value={status}
            onChange={setStatus}
            className="mb-0 items-center"
          />
          <Button
            variant="outline"
            className="h-12 rounded-full"
            onClick={() => exportTransactions(filtered)}
          >
            <Download size={17} />
            {t("export")}
          </Button>
        </div>
      </div>
      <Card className="overflow-hidden p-0">
        <TransactionTable transactions={filtered} />
      </Card>
    </div>
  );
}
