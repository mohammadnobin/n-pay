import { PaymentProcessing } from "@/components/dashboard/page/pay/PaymentProcessing";
import en from "@/i18n/en.json";

export const metadata = { title: en.processingTitle };

export default function Page() {
  return <PaymentProcessing />;
}
