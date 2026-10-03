"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Phone, Plus, ArrowLeft, Trash2, Star } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { useEditableProfile } from "@/hooks/useEditableProfile";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeading } from "@/components/share/PageHeading";
import { routes } from "@/constants/routes";
import { secondaryPhoneSchema } from "@/schemas/auth.schema";
import type { z } from "zod";

type AddPhoneValues = z.infer<typeof secondaryPhoneSchema>;

export function PhoneNumbers() {
  const { t } = useLang();
  const { profile: p, hydrated, update } = useEditableProfile();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddPhoneValues>({
    resolver: zodResolver(secondaryPhoneSchema),
    defaultValues: { phone: "" },
  });

  if (!hydrated) return null;

  const remaining = p.maxSecondaryPhones - p.secondaryPhones.length;

  function addNumber({ phone }: AddPhoneValues) {
    if (phone === p.phone || p.secondaryPhones.includes(phone)) {
      toast.error(t("numberAlreadyLinked"));
      return;
    }
    update({ secondaryPhones: [...p.secondaryPhones, phone] });
    toast.success(t("numberAdded"));
    reset({ phone: "" });
  }

  function removeNumber(number: string) {
    update({
      secondaryPhones: p.secondaryPhones.filter((n) => n !== number),
    });
    toast.success(t("numberRemoved"));
  }

  function makePrimary(number: string) {
    update({
      phone: number,
      secondaryPhones: p.secondaryPhones.map((n) =>
        n === number ? p.phone : n,
      ),
    });
    toast.success(t("primaryUpdated"));
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeading
        eyebrow={t("navProfile")}
        title={t("phonesTitle")}
        note={t("travelNumbersNote", { count: p.maxSecondaryPhones })}
      />
      <Card>
        <h2 className="section-title">{t("primaryPhone")}</h2>
        <p className="mt-3 flex items-center gap-2 text-sm" dir="ltr">
          <Phone size={16} className="text-primary" />
          {p.phone}
        </p>
      </Card>
      <Card>
        <h2 className="section-title">{t("travelNumbers")}</h2>
        {p.secondaryPhones.length > 0 && (
          <ul className="mt-5 space-y-3">
            {p.secondaryPhones.map((number) => (
              <li
                key={number}
                className="flex items-center gap-3 border-b border-border pb-3 last:border-b-0 last:pb-0"
              >
                <Phone size={16} className="shrink-0 text-muted-foreground" />
                <span className="text-sm" dir="ltr">
                  {number}
                </span>
                <div className="ms-auto flex shrink-0 items-center gap-1">
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="rounded-full"
                    onClick={() => makePrimary(number)}
                  >
                    <Star size={14} />
                    {t("setPrimary")}
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="rounded-full text-danger"
                    aria-label={`${t("remove")} ${number}`}
                    onClick={() => removeNumber(number)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <form
          className="mt-6"
          onSubmit={handleSubmit(addNumber)}
          noValidate
        >
          <label htmlFor="new-phone" className="field-label">
            {t("addNumber")}
          </label>
          <div className="flex flex-wrap gap-3">
            <Input
              id="new-phone"
              type="tel"
              dir="ltr"
              placeholder="+975…"
              className="min-w-0 flex-1"
              disabled={remaining <= 0}
              {...register("phone")}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "new-phone-error" : undefined}
            />
            <Button
              type="submit"
              variant="outline"
              className="rounded-full"
              disabled={remaining <= 0}
            >
              <Plus size={16} />
              {t("addNumber")}
            </Button>
          </div>
          {errors.phone && (
            <p id="new-phone-error" className="field-error">
              {t(errors.phone.message!)}
            </p>
          )}
          <p className="mt-3 text-xs text-muted-foreground">
            {remaining <= 0
              ? t("maxNumbersReached")
              : t("phoneVerificationPending")}
          </p>
        </form>
      </Card>
      <Button variant="outline" asChild className="rounded-full">
        <Link href={routes.profile}>
          <ArrowLeft size={17} className="rtl:rotate-180" />
          {t("back")}
        </Link>
      </Button>
    </div>
  );
}
