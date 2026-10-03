"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  UserRound,
  Mail,
  Phone,
  Gift,
  IdCard,
  ShieldCheck,
  Copy,
  CalendarDays,
  ChevronRight,
  Bookmark,
  Pencil,
  Camera,
  UserX,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { useEditableProfile } from "@/hooks/useEditableProfile";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { PageHeading } from "@/components/share/PageHeading";
import { routes } from "@/constants/routes";
import { cn } from "@/lib/utils";
import {
  profileEditSchema,
  type ProfileEditValues,
} from "@/schemas/profile.schema";
import type { Translate } from "@/hooks/useLang";
import type { DashboardProfile } from "@/types";

const KYC_LABELS: Record<DashboardProfile["kycStatus"], string> = {
  verified: "verified",
  pending: "pending",
  not_started: "incomplete",
  rejected: "rejected",
};

function personalRows(t: Translate, p: DashboardProfile) {
  return [
    {
      key: "username",
      icon: UserRound,
      tone: "bg-blue-500/10 text-blue-500",
      label: t("username"),
      value: `@${p.username}`,
    },
    {
      key: "email",
      icon: Mail,
      tone: "bg-violet-500/10 text-violet-500",
      label: t("email"),
      value: p.email,
    },
    {
      key: "phone",
      icon: Phone,
      tone: "bg-emerald-500/10 text-emerald-500",
      label: t("phone"),
      value: p.phone || t("notSet"),
      href: routes.phoneNumbers,
    },
    {
      key: "referralCode",
      icon: Gift,
      tone: "bg-orange-500/10 text-orange-500",
      label: t("referralCode"),
      value: p.referralCode,
    },
  ];
}

function truncateId(id: string) {
  return id.length > 16 ? `${id.slice(0, 8)}...${id.slice(-8)}` : id;
}

type InfoRowData = {
  key: string;
  icon: LucideIcon;
  tone: string;
  label: string;
  value: string;
  href?: string;
};

/** A card's worth of icon/label/value rows; a row with `href` becomes a link
 *  to the page that manages it. */
function InfoRows({ rows }: { rows: readonly InfoRowData[] }) {
  return (
    <ul>
      {rows.map((row) => {
        const content = (
          <>
            <span className={cn("icon-box", row.tone)}>
              <row.icon size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{row.label}</p>
              <p
                className="mt-0.5 truncate text-xs text-muted-foreground"
                dir="ltr"
              >
                {row.value}
              </p>
            </div>
            {row.href && (
              <ChevronRight
                size={18}
                className="ms-auto shrink-0 text-muted-foreground rtl:rotate-180"
              />
            )}
          </>
        );
        return (
          <li key={row.key}>
            {row.href ? (
              <Link
                href={row.href}
                className="flex items-center gap-4 border-b border-border px-6 py-4 transition-colors last:border-b-0 hover:bg-muted/40"
              >
                {content}
              </Link>
            ) : (
              <div className="flex items-center gap-4 border-b border-border px-6 py-4 last:border-b-0">
                {content}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

const MAX_PHOTO_BYTES = 5 * 1024 * 1024;

export function UserProfile() {
  const { t, lang: locale } = useLang();
  const { profile: p, hydrated, update } = useEditableProfile();
  const [editOpen, setEditOpen] = useState(false);
  const photoInput = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileEditValues>({
    resolver: zodResolver(profileEditSchema),
    defaultValues: { username: p.username, phone: p.phone },
  });

  function submitEdit(values: ProfileEditValues) {
    update(values);
    toast.success(t("profileUpdated"));
    setEditOpen(false);
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error(t("photoInvalidType"));
      return;
    }
    if (file.size > MAX_PHOTO_BYTES) {
      toast.error(t("photoTooLarge"));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        update({ avatarUrl: reader.result });
        toast.success(t("photoUpdated"));
      }
    };
    reader.readAsDataURL(file);
  }

  if (!hydrated) return null;

  const verified = p.kycStatus === "verified";
  const verifiedDate =
    verified &&
    p.kycVerifiedOn &&
    new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(
      new Date(p.kycVerifiedOn),
    );

  const identityRows = [
    {
      key: "kycStatus",
      icon: IdCard,
      tone: "bg-orange-500/10 text-orange-500",
      label: t("kycStatusField"),
      value: t(KYC_LABELS[p.kycStatus]),
      href: routes.kyc,
    },
    {
      key: "idType",
      icon: ShieldCheck,
      tone: "bg-violet-500/10 text-violet-500",
      label: t("idTypeField"),
      value: p.idType ?? t("notAvailable"),
    },
    {
      key: "idNumber",
      icon: Copy,
      tone: "bg-muted text-muted-foreground",
      label: t("idNumberField"),
      value: verified && p.idNumber ? p.idNumber : t("notAvailable"),
    },
    {
      key: "verifiedOn",
      icon: CalendarDays,
      tone: "bg-emerald-500/10 text-emerald-500",
      label: t("verifiedOnField"),
      value: verifiedDate || t("notVerified"),
    },
  ] as const;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeading
        eyebrow={t("account")}
        title={t("profileTitle")}
        note={t("profileNote")}
      />

      <Card className="relative flex flex-col items-center gap-4 py-10 text-center">
        <Dialog
          open={editOpen}
          onOpenChange={(open) => {
            setEditOpen(open);
            if (open) reset({ username: p.username, phone: p.phone });
          }}
        >
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="absolute end-4 top-4 rounded-full"
            >
              <Pencil size={14} />
              {t("editProfile")}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="text-xl font-bold">
              {t("editProfile")}
            </DialogTitle>
            <form
              onSubmit={handleSubmit(submitEdit)}
              className="mt-6 space-y-5 text-start"
              noValidate
            >
              <div>
                <label htmlFor="edit-username" className="field-label">
                  {t("username")}
                </label>
                <Input
                  id="edit-username"
                  {...register("username")}
                  aria-invalid={!!errors.username}
                  aria-describedby={
                    errors.username ? "edit-username-error" : undefined
                  }
                />
                {errors.username && (
                  <p id="edit-username-error" className="field-error">
                    {t(errors.username.message!)}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="edit-phone" className="field-label">
                  {t("phone")}
                </label>
                <Input
                  id="edit-phone"
                  type="tel"
                  dir="ltr"
                  {...register("phone")}
                  aria-invalid={!!errors.phone}
                  aria-describedby={
                    errors.phone ? "edit-phone-error" : undefined
                  }
                />
                {errors.phone && (
                  <p id="edit-phone-error" className="field-error">
                    {t(errors.phone.message!)}
                  </p>
                )}
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full"
                  onClick={() => setEditOpen(false)}
                >
                  {t("cancel")}
                </Button>
                <Button type="submit" className="rounded-full">
                  {t("save")}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
        <div className="relative">
          <span className="flex size-24 items-center justify-center overflow-hidden rounded-full bg-muted text-muted-foreground">
            {p.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.avatarUrl}
                alt=""
                className="size-full object-cover"
              />
            ) : (
              <UserRound size={40} />
            )}
          </span>
          <button
            type="button"
            onClick={() => photoInput.current?.click()}
            aria-label={t("changePhoto")}
            className="absolute end-0 bottom-0 flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground ring-4 ring-card transition-transform hover:scale-105"
          >
            <Camera size={14} />
          </button>
          <input
            ref={photoInput}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={handlePhotoChange}
          />
        </div>
        <div>
          <p className="text-lg font-bold">{p.username}</p>
          <p className="mt-1 text-sm text-muted-foreground">{p.email}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold",
              verified
                ? "bg-success/10 text-success"
                : "bg-warning/10 text-warning",
            )}
          >
            <ShieldCheck size={13} />
            {t(verified ? "verified" : "unverified")}
          </span>
          <Badge className="bg-muted text-muted-foreground">
            <CalendarDays size={13} />
            {t("memberSince")} {p.memberSince}
          </Badge>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <section>
          <p className="eyebrow mb-3 px-1">{t("personalInformation")}</p>
          <Card className="p-0">
            <InfoRows rows={personalRows(t, p)} />
          </Card>
        </section>

        <section>
          <p className="eyebrow mb-3 px-1">{t("identityVerification")}</p>
          <Card className="p-0">
            <InfoRows rows={identityRows} />
          </Card>
        </section>
      </div>

      <section>
        <p className="eyebrow mb-3 px-1">{t("walletSectionTitle")}</p>
        <Card className="p-0">
          <Link
            href={routes.wallet}
            className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-muted/40"
          >
            <span className="icon-box bg-orange-500/10 text-orange-500">
              <Bookmark size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{t("savedAddresses")}</p>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                {t("savedAddressesNote")}
              </p>
            </div>
            <ChevronRight
              size={18}
              className="ms-auto shrink-0 text-muted-foreground rtl:rotate-180"
            />
          </Link>
        </Card>
      </section>

      <Card className="border border-danger/30">
        <p className="font-bold text-danger">{t("deleteAccountTitle")}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {t("deleteAccountCardNote")}
        </p>
        <Button asChild variant="danger" className="mt-5 rounded-full">
          <Link href={routes.deleteAccount}>
            <UserX size={16} />
            {t("deleteMyAccount")}
          </Link>
        </Button>
      </Card>

      <p className="text-center text-xs text-muted-foreground" dir="ltr">
        {t("userIdLabel")}: {truncateId(p.userId)}
      </p>
    </div>
  );
}
