import { SecurityBiometric } from "@/components/dashboard/page/security/SecurityBiometric";
import en from "@/i18n/en.json";

export const metadata = { title: en.securityCenterTitle };

export default function Page() {
  return <SecurityBiometric />;
}
