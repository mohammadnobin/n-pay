import { Suspense } from "react";
import { TransactionDetailsRoute } from "@/components/dashboard/page/transaction/TransactionDetailsRoute";
import en from "@/i18n/en.json";

export const metadata = { title: en.detailsTitle };

// The query string is only known in the browser, so the prerendered HTML stops
// at this boundary and the details render on the client.
export default function Page() {
  return (
    <Suspense>
      <TransactionDetailsRoute />
    </Suspense>
  );
}
