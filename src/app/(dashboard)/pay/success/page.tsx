import { PaymentSuccess } from "@/components/dashboard/page/pay/PaymentSuccess";
import en from "@/i18n/en.json";

export const metadata = { title: en.successTitle };

export default function Page() {
  return <PaymentSuccess />;
}
