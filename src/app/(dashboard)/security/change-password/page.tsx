import { ChangePassword } from "@/components/dashboard/page/security/ChangePassword";
import en from "@/i18n/en.json";

export const metadata = { title: en.changePasswordTitle };

export default function Page() {
  return <ChangePassword />;
}
