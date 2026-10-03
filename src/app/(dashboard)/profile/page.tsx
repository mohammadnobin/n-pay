import { UserProfile } from "@/components/dashboard/page/profile/UserProfile";
import en from "@/i18n/en.json";

export const metadata = { title: en.profileTitle };

export default function Page() {
  return <UserProfile />;
}
