"use client";
import { Select } from "@/components/ui/select";
import { useLang } from "@/hooks/useLang";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Globe, Phone, ShieldCheck } from "lucide-react";
import { authSchema, type AuthValues } from "@/schemas/auth.schema";
import { useAuthConfiguration, useRequestOtp } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isDemo } from "@/lib/axios";
export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const { t, has, lang: locale } = useLang();
  const isRegister = mode === "register";
  const configuration = useAuthConfiguration();
  const router = useRouter();
  const request = useRequestOtp();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthValues>({
    resolver: zodResolver(authSchema),
    defaultValues: { phone: "", country: "", consent: false },
  });
  async function submit(values: AuthValues) {
    const result = await request
      .mutateAsync({ ...values, purpose: mode })
      .catch(() => null);
    if (result) {
      useAuthStore
        .getState()
        .setChallenge(result.challengeId, values.phone, result.expiresIn);
      router.push("/otp");
    }
  }
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">
        {t(isRegister ? "authCreateTitle" : "authLoginTitle")}
      </h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {t(isRegister ? "authCreateNote" : "authLoginNote")}
      </p>
      <form
        onSubmit={handleSubmit(submit)}
        className="mt-8 space-y-4"
        noValidate
      >
        <div>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select
                id="country"
                name={field.name}
                ref={field.ref}
                value={field.value}
                onValueChange={field.onChange}
                onBlur={field.onBlur}
                label={t("country")}
                placeholder={t("chooseCountry")}
                icon={<Globe size={18} />}
                searchable
                disabled={!configuration.data}
                invalid={!!errors.country}
                describedBy={errors.country ? "country-error" : undefined}
                className="h-12"
                options={(configuration.data?.allowedCountries ?? []).map(
                  (c) => ({
                    value: c,
                    label: has(c)
                      ? t(c)
                      : (new Intl.DisplayNames([locale], { type: "region" }).of(
                          c,
                        ) ?? c),
                    keywords: [c],
                  }),
                )}
              />
            )}
          />
          {errors.country && (
            <p id="country-error" className="field-error">
              {t(errors.country.message!)}
            </p>
          )}
        </div>
        <div>
          <div className="relative">
            <Phone
              size={18}
              aria-hidden
              className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              id="phone"
              type="tel"
              autoComplete="tel"
              dir="ltr"
              aria-label={t("phone")}
              placeholder="+44 7700 900123"
              {...register("phone", {
                setValueAs: (v) => v.replace(/[\s()-]/g, ""),
              })}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className="h-12 rounded-full ps-11"
            />
          </div>
          {errors.phone && (
            <p id="phone-error" className="field-error">
              {t(errors.phone.message!)}
            </p>
          )}
        </div>
        <div className="rounded-2xl bg-muted/60 p-4">
          <label className="flex items-start gap-3 text-xs leading-6 text-muted-foreground">
            <input
              type="checkbox"
              className="mt-1 size-4 shrink-0 accent-primary"
              {...register("consent")}
              aria-invalid={!!errors.consent}
            />
            <span>
              {t("consent")}{" "}
              <Link
                href="/security"
                className="font-semibold text-primary underline"
              >
                {t("security")}
              </Link>
            </span>
          </label>
          {errors.consent && (
            <p className="field-error">{t(errors.consent.message!)}</p>
          )}
        </div>
        {configuration.error && (
          <p role="alert" className="field-error">
            {t("requestFailed")}{" "}
            <button
              type="button"
              onClick={() => configuration.refetch()}
              className="underline"
            >
              {t("retry")}
            </button>
          </p>
        )}
        {request.error && (
          <p role="alert" className="field-error">
            {t("requestFailed")}
          </p>
        )}
        <Button
          type="submit"
          className="h-12 w-full rounded-full"
          disabled={request.isPending || !configuration.data}
        >
          {t(request.isPending ? "loading" : "sendCode")}
          <ArrowRight size={18} className="rtl:rotate-180" />
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          {t("geoNote")}
        </p>
      </form>
      <div className="mt-7 text-center text-sm">
        <span className="text-muted-foreground">
          {t(isRegister ? "existingAccount" : "newAccount")}{" "}
        </span>
        <Link
          className="font-semibold text-primary"
          href={isRegister ? "/login" : "/register"}
        >
          {t(isRegister ? "login" : "register")}
        </Link>
      </div>
      {isDemo && (
        <p className="mt-5 rounded-xl bg-accent p-3 text-center text-xs text-primary">
          {t("demoCode")}
        </p>
      )}
      <p className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck size={15} />
        {t("nonCustodialNote")}
      </p>
    </div>
  );
}
