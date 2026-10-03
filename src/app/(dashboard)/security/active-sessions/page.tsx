import { ActiveSessions } from "@/components/dashboard/page/security/ActiveSessions";
import en from "@/i18n/en.json";

export const metadata = { title: en.activeSessionsTitle };

export default function Page() {
  return <ActiveSessions />;
}
