"use client";
import { useLang } from "@/hooks/useLang";
import { Card } from "@/components/ui/card";
import { PageHeading, SectionHeading } from "@/components/share/PageHeading";
import { TransactionTable } from "@/components/dashboard/page/transaction/TransactionTable";
import { BalanceCard } from "./home/BalanceCard";
import { KycStatus } from "./home/KycStatus";
import { RateTicker } from "./home/RateTicker";
import { ScanPayBanner } from "./home/ScanPayBanner";
import {
  dashboardBalanceTrend,
  dashboardBalances,
  dashboardRates,
  dashboardTransactions,
} from "@/constants/dashboard";
import { routes } from "@/constants/routes";

/** How many payments the home screen shows before sending you to history. */
const RECENT_LIMIT = 5;

/** Total of the sample balances, fixed at module load since nothing fetches. */
const TOTAL_BALANCE = dashboardBalances.reduce(
  (sum, row) => sum + row.usdValue,
  0,
);

/** The latest payments. Filtering by status lives on the history screen, so
 *  home just shows the most recent few and links across. */
const RECENT_TRANSACTIONS = dashboardTransactions.slice(0, RECENT_LIMIT);

/**
 * Home answers four questions in one screen: what the wallet holds, today's
 * rates, how to pay, and what was paid recently. Every figure comes from
 * `@/constants/dashboard` — no fetch, no wallet state, nothing to wait on, so
 * the screen renders the same on the server and on first paint.
 */
export function DashboardHome() {
  const { t } = useLang();
  return (
    <div className="space-y-6">
      <PageHeading eyebrow={t("dashboard")} title={t("cryptoHome")} note={""} />

      {/* Money on the left, identity beside it; the call to action runs the
          full width underneath so neither column has to stretch to match.
          Between `lg` and `xl` the sidebar rail leaves less room, so identity
          takes two fifths there rather than a cramped third. */}
      <div className="grid gap-6 lg:grid-cols-5 xl:grid-cols-3">
        <div className="lg:col-span-3 xl:col-span-2">
          <BalanceCard
            total={TOTAL_BALANCE}
            balances={dashboardBalances}
            trend={dashboardBalanceTrend}
          />
        </div>
        <aside className="lg:col-span-2 xl:col-span-1">
          <KycStatus />
        </aside>
      </div>

      <RateTicker rates={dashboardRates} />

      <section>
        <SectionHeading title={t("quickPay")} />
        <ScanPayBanner />
      </section>

      <section>
        <SectionHeading
          title={t("recentActivity")}
          href={routes.transactions}
          linkLabel={t("seeAll")}
        />
        <Card className="overflow-hidden p-0">
          <TransactionTable transactions={RECENT_TRANSACTIONS} />
        </Card>
      </section>
    </div>
  );
}
