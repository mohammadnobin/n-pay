"use client";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  ArrowRight,
  Clock,
  Mail,
  MessageSquare,
  Send,
  Tag,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Reveal, REVEAL_STEP } from "@/components/share/Reveal";
import { useSendContactMessage } from "@/hooks/useContact";
import {
  CONTACT_TOPICS,
  contactSchema,
  type ContactValues,
} from "@/schemas/contact.schema";
import { routes } from "@/constants/routes";
import { env } from "@/config/env";
import { ApiError } from "@/lib/axios";

/** What a reader can expect before they write, beside the form. */
const PROMISES: [LucideIcon, string, string][] = [
  [Clock, "contactHoursTitle", "contactHoursValue"],
  [MessageSquare, "contactResponseTitle", "contactResponseValue"],
];

export function ContactPage() {
  const { t, has } = useLang();
  const send = useSendContactMessage();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", topic: undefined, message: "" },
  });

  async function submit(values: ContactValues) {
    try {
      await send.mutateAsync(values);
      toast.success(t("contactSent"));
      reset();
    } catch (error) {
      // Services throw an ApiError whose code doubles as a dictionary key.
      const code = error instanceof ApiError ? error.code : "requestFailed";
      toast.error(t(has(code) ? code : "requestFailed"));
    }
  }

  return (
    <section
      id="contact"
      data-stop="contact"
      className="mx-auto max-w-7xl px-6 py-20"
    >
      <Reveal className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-[-.045em] sm:text-5xl">
          {t("contactTitle")}
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          {t("contactIntro")}
        </p>
      </Reveal>

      <div className="mt-14 grid items-start gap-6 lg:grid-cols-[1fr_1.4fr] lg:gap-10">
        <Reveal from="start" className="flex flex-col gap-4">
          {PROMISES.map(([Icon, title, value]) => (
            <div
              key={title}
              className="flex items-start gap-4 rounded-2xl bg-card p-5 shadow-card ring-1 ring-border/60"
            >
              <span className="icon-box bg-accent text-primary">
                <Icon size={20} aria-hidden />
              </span>
              <div>
                <p className="font-semibold">{t(title)}</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {t(value)}
                </p>
              </div>
            </div>
          ))}

          {/* Only shown once an address is configured, so the page never
           *  advertises a mailbox that does not exist. */}
          {env.supportEmail && (
            <a
              href={`mailto:${env.supportEmail}`}
              className="flex items-start gap-4 rounded-2xl bg-card p-5 shadow-card ring-1 ring-border/60 transition-transform hover:-translate-y-0.5"
            >
              <span className="icon-box bg-accent text-primary">
                <Mail size={20} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="font-semibold">{t("contactEmailChannel")}</p>
                <p className="mt-1 truncate text-sm text-muted-foreground">
                  {env.supportEmail}
                </p>
              </div>
            </a>
          )}

          <div className="rounded-2xl border border-border bg-muted/40 p-5">
            <p className="font-semibold">{t("contactHelpFirst")}</p>
            <Link
              href={routes.support}
              className="mt-2 inline-flex items-center gap-2 text-sm font-semibold hover:text-primary"
            >
              {t("contactHelpFirstLink")}
              <ArrowRight size={15} className="rtl:rotate-180" />
            </Link>
          </div>
        </Reveal>

        <Reveal
          from="end"
          delay={REVEAL_STEP}
          className="rounded-[2rem] bg-card p-7 shadow-card ring-1 ring-border/60 sm:p-9"
        >
          <h2 className="text-xl font-bold">{t("contactFormTitle")}</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {t("contactFormNote")}
          </p>

          <form
            onSubmit={handleSubmit(submit)}
            className="mt-7 space-y-5"
            noValidate
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="field-label">
                  {t("contactName")}
                </label>
                <Input
                  id="contact-name"
                  autoComplete="name"
                  placeholder={t("contactNamePlaceholder")}
                  aria-invalid={!!errors.name}
                  aria-describedby={
                    errors.name ? "contact-name-error" : undefined
                  }
                  {...register("name")}
                />
                {errors.name && (
                  <p id="contact-name-error" className="field-error">
                    {t(errors.name.message!)}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-email" className="field-label">
                  {t("contactEmail")}
                </label>
                <Input
                  id="contact-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder={t("contactEmailPlaceholder")}
                  aria-invalid={!!errors.email}
                  aria-describedby={
                    errors.email ? "contact-email-error" : undefined
                  }
                  {...register("email")}
                />
                {errors.email && (
                  <p id="contact-email-error" className="field-error">
                    {t(errors.email.message!)}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Controller
                name="topic"
                control={control}
                render={({ field }) => (
                  <Select
                    id="contact-topic"
                    name={field.name}
                    ref={field.ref}
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                    onBlur={field.onBlur}
                    label={t("contactTopic")}
                    placeholder={t("contactTopicPlaceholder")}
                    icon={<Tag size={18} />}
                    invalid={!!errors.topic}
                    describedBy={
                      errors.topic ? "contact-topic-error" : undefined
                    }
                    options={CONTACT_TOPICS.map((topic) => ({
                      value: topic,
                      label: t(
                        `contactTopic${topic[0].toUpperCase()}${topic.slice(1)}`,
                      ),
                    }))}
                  />
                )}
              />
              {errors.topic && (
                <p id="contact-topic-error" className="field-error">
                  {t(errors.topic.message!)}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="contact-message" className="field-label">
                {t("contactMessage")}
              </label>
              <Textarea
                id="contact-message"
                placeholder={t("contactMessagePlaceholder")}
                aria-invalid={!!errors.message}
                aria-describedby={
                  errors.message ? "contact-message-error" : undefined
                }
                {...register("message")}
              />
              {errors.message && (
                <p id="contact-message-error" className="field-error">
                  {t(errors.message.message!)}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={send.isPending}
              className="h-13 w-full rounded-full sm:w-auto sm:px-7"
            >
              {t(send.isPending ? "contactSending" : "contactSend")}
              <Send size={17} className="rtl:-scale-x-100" />
            </Button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
