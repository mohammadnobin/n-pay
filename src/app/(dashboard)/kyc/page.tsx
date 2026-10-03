import { KycVerification } from "@/components/dashboard/page/kyc/KycVerification";
import en from "@/i18n/en.json";

export const metadata = { title: en.verifyTitle };

export default function Page() {
  return <KycVerification />;
}
