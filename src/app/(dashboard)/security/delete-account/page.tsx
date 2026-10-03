import { DeleteAccount } from "@/components/dashboard/page/security/DeleteAccount";
import en from "@/i18n/en.json";

export const metadata = { title: en.deleteAccountTitle };

export default function Page() {
  return <DeleteAccount />;
}
