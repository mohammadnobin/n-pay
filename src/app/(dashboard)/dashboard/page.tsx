import { DashboardHome } from "@/components/dashboard/DashboardHome";
import en from "@/i18n/en.json";

export const metadata = { title: en.dashboard };

export default function Page() {
  return <DashboardHome />;
}
