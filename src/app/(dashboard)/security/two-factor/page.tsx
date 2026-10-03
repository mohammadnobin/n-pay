import { TwoFactorAuth } from "@/components/dashboard/page/security/TwoFactorAuth";
import en from "@/i18n/en.json";

export const metadata = { title: en.twoFactorTitle };

export default function Page() {
  return <TwoFactorAuth />;
}
