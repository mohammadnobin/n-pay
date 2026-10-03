import { PaymentQuote } from "@/components/dashboard/page/pay/PaymentQuote";
import en from "@/i18n/en.json";

export const metadata = { title: en.quoteTitle };

export default function Page() {
  return <PaymentQuote />;
}
