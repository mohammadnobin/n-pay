import { AuthForm } from "@/components/forms/AuthForm";
import en from "@/i18n/en.json";

export const metadata = { title: en.login };

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
