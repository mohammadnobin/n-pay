import { OtpForm } from "@/components/auth/OtpForm";
import en from "@/i18n/en.json";

export const metadata = { title: en.otpTitle };

export default function OtpPage() {
  return <OtpForm />;
}
