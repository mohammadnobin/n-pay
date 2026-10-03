"use client";
import { useLang } from "@/hooks/useLang";
import { Button } from "@/components/ui/button";
export default function ErrorPage({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const { t } = useLang();
  return (
    <main className="flex min-h-96 flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-xl font-semibold">{t("requestFailed")}</h1>
      <Button onClick={reset}>{t("retry")}</Button>
    </main>
  );
}
