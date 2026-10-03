import { TransactionPin } from "@/components/dashboard/page/security/TransactionPin";
import en from "@/i18n/en.json";

export const metadata = { title: en.setTransactionPinTitle };

export default function Page() {
  return <TransactionPin />;
}
