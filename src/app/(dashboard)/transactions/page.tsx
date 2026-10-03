import { TransactionHistory } from "@/components/dashboard/page/transaction/TransactionHistory";
import en from "@/i18n/en.json";

export const metadata = { title: en.historyTitle };

export default function Page() {
  return <TransactionHistory />;
}
