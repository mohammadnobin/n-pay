import { ConfirmPayment } from "@/components/dashboard/page/pay/ConfirmPayment";
import en from "@/i18n/en.json";

export const metadata = { title: en.confirmTitle };

export default function Page() {
  return <ConfirmPayment />;
}
