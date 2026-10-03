"use client";
import Link from "next/link";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, UserRound, CalendarDays, MapPin } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { IconInput } from "@/components/share/IconInput";
import { PageHeading } from "@/components/share/PageHeading";
import { dashboardProfile } from "@/constants/dashboard";
import { routes } from "@/constants/routes";
import { kycDetailsSchema, type KycDetailsValues } from "@/schemas/kyc.schema";

const KYC_COUNTRIES = ["GB", "ES", "AE", "BT", "US"];

export function KycDetails() {
  const { t } = useLang();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<KycDetailsValues>({
    resolver: zodResolver(kycDetailsSchema),
    defaultValues: {
      fullName: dashboardProfile.name,
      dateOfBirth: "",
      country: dashboardProfile.country,
      address: "",
    },
  });

  function submit() {
    toast.success(t("detailsSaved"));
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHeading
        eyebrow={t("navKyc")}
        title={t("verifyStep1")}
        note={t("confirmDetailsNote")}
      />
      <Card>
        <form
          onSubmit={handleSubmit(submit)}
          className="space-y-5"
          noValidate
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="kyc-full-name" className="field-label">
                {t("fullName")}
              </label>
              <IconInput
                id="kyc-full-name"
                icon={UserRound}
                {...register("fullName")}
                aria-invalid={!!errors.fullName}
                aria-describedby={
                  errors.fullName ? "kyc-full-name-error" : undefined
                }
              />
              {errors.fullName && (
                <p id="kyc-full-name-error" className="field-error">
                  {t(errors.fullName.message!)}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="kyc-dob" className="field-label">
                {t("dateOfBirth")}
              </label>
              <IconInput
                id="kyc-dob"
                icon={CalendarDays}
                type="date"
                dir="ltr"
                {...register("dateOfBirth")}
                onClick={(e) => e.currentTarget.showPicker?.()}
                aria-invalid={!!errors.dateOfBirth}
                aria-describedby={
                  errors.dateOfBirth ? "kyc-dob-error" : undefined
                }
              />
              {errors.dateOfBirth && (
                <p id="kyc-dob-error" className="field-error">
                  {t(errors.dateOfBirth.message!)}
                </p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="kyc-country" className="field-label">
              {t("country")}
            </label>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <Select
                  id="kyc-country"
                  name={field.name}
                  ref={field.ref}
                  value={field.value}
                  onValueChange={field.onChange}
                  onBlur={field.onBlur}
                  label={t("country")}
                  placeholder={t("chooseCountry")}
                  invalid={!!errors.country}
                  describedBy={errors.country ? "kyc-country-error" : undefined}
                  options={KYC_COUNTRIES.map((code) => ({
                    value: code,
                    label: t(code),
                  }))}
                />
              )}
            />
            {errors.country && (
              <p id="kyc-country-error" className="field-error">
                {t(errors.country.message!)}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="kyc-address" className="field-label">
              {t("address")}
            </label>
            <IconInput
              id="kyc-address"
              icon={MapPin}
              placeholder={t("addressPlaceholder")}
              {...register("address")}
              aria-invalid={!!errors.address}
              aria-describedby={
                errors.address ? "kyc-address-error" : undefined
              }
            />
            {errors.address && (
              <p id="kyc-address-error" className="field-error">
                {t(errors.address.message!)}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full rounded-full" disabled={isSubmitting}>
            {t("saveDetails")}
          </Button>
        </form>
      </Card>
      <Button variant="outline" asChild className="rounded-full">
        <Link href={routes.kyc}>
          <ArrowLeft size={17} className="rtl:rotate-180" />
          {t("back")}
        </Link>
      </Button>
    </div>
  );
}
