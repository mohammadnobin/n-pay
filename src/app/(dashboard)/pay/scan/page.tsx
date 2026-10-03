import { ScanQr } from "@/components/dashboard/page/pay/ScanQr";
import en from "@/i18n/en.json";

export const metadata = { title: en.scanTitlePage };

export default function Page() {
  return <ScanQr />;
}
