"use client";
import { useLang } from "@/hooks/useLang";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { otpSchema } from "@/schemas/auth.schema";
import { useAuthStore } from "@/store/authStore";
import { useVerifyOtp } from "@/hooks/useAuth";
import { queryKeys } from "@/lib/query-keys";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isDemo } from "@/lib/axios";
import { isExpired } from "@/lib/utils";
import { routes } from "@/constants/routes";
export function OtpForm() {
  const { t } = useLang();
  const router = useRouter();
  const client = useQueryClient();
  const auth = useAuthStore();
  const verify = useVerifyOtp();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<{ code: string }>({ resolver: zodResolver(otpSchema) });
  async function submit({ code }: { code: string }) {
    if (isExpired(auth.expiresAt)) {
      setError("code", { message: "expiredCode" });
      return;
    }
    const result = await verify
      .mutateAsync({ challengeId: auth.challengeId!, code })
      .catch(() => null);
    if (result) {
      client.clear();
      client.setQueryData(queryKeys.auth.session, result);
      auth.clear();
      router.replace(routes.dashboard);
    }
  }
  if (!auth.challengeId)
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold">{t("startAgain")}</h1>
        <Button asChild>
          <Link href="/login">{t("login")}</Link>
        </Button>
      </div>
    );
  return (
    <div>
      <h1 className="text-3xl font-semibold">{t("otpTitle")}</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        {t("otpDescription", { phone: auth.phone })}
      </p>
      <form onSubmit={handleSubmit(submit)} className="mt-8 space-y-6">
        <div>
          <label className="field-label" htmlFor="code">
            {t("code")}
          </label>
          <Input
            id="code"
            dir="ltr"
            className="h-16 text-center text-2xl tracking-[.6em]"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            {...register("code")}
            aria-invalid={!!errors.code}
          />
          {errors.code && (
            <p role="alert" className="field-error">
              {t(errors.code.message!)}
            </p>
          )}
        </div>
        {verify.error && (
          <p className="field-error" role="alert">
            {t(isDemo ? "invalidOtp" : "requestFailed")}
          </p>
        )}
        <Button type="submit" disabled={verify.isPending} className="w-full">
          {t(verify.isPending ? "loading" : "verifyCode")}
        </Button>
      </form>
      <Link
        href="/login"
        className="mt-6 block text-center text-sm text-primary"
      >
        {t("changePhone")}
      </Link>
      {isDemo && (
        <p className="mt-6 rounded-xl bg-accent p-4 text-xs text-primary">
          {t("demoCode")}
        </p>
      )}
    </div>
  );
}
