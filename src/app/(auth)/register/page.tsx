import { AuthForm } from "@/components/forms/AuthForm";
import en from "@/i18n/en.json";

export const metadata = { title: en.register };

export default function RegisterPage() {
  return <AuthForm mode="register" />;
}
