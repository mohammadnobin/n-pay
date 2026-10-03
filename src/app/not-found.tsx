"use client";
import { useLang } from "@/hooks/useLang";
import { routes } from "@/constants/routes";
import { NotFound as NotFoundContent, Illustration } from "@/components/ui/not-found";

export default function NotFound() {
  const { t } = useLang();
  return (
    <main className="relative min-h-screen w-full bg-background p-6 md:p-10">
      <div className="relative mx-auto w-full max-w-5xl">
        <Illustration
          aria-hidden
          className="absolute inset-0 h-[50vh] w-full text-foreground opacity-[0.04] dark:opacity-[0.03]"
        />
        <NotFoundContent
          title={t("notFoundTitle")}
          description={t("notFound")}
          homeHref={routes.home}
          homeLabel={t("returnHome")}
          backHref={routes.home}
          backLabel={t("back")}
          showSearch={false}
        />
      </div>
    </main>
  );
}
