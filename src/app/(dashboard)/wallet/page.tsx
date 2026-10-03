import { WalletOverview } from "@/components/dashboard/page/wallet/WalletOverview";
import en from "@/i18n/en.json";

export const metadata = { title: en.walletTitle };

export default function Page() {
  return <WalletOverview />;
}
