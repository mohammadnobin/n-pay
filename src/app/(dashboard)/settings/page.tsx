import { SettingsPanel } from "@/components/dashboard/page/settings/SettingsPanel";
import en from "@/i18n/en.json";

export const metadata = { title: en.settingsTitle };

export default function Page() {
  return <SettingsPanel />;
}
