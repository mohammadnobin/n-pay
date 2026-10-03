import { ConnectWallet } from "@/components/dashboard/page/wallet/ConnectWallet";
import en from "@/i18n/en.json";

export const metadata = { title: en.connectTitlePage };

export default function Page() {
  return <ConnectWallet />;
}
