import { MerchantInfo } from "@/components/dashboard/page/pay/MerchantInfo";
import en from "@/i18n/en.json";

export const metadata = { title: en.merchantInfoTitle };

export default function Page() {
  return <MerchantInfo />;
}
