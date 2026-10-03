"use client";
import { useLang } from "@/hooks/useLang";
import { AlertCircle, Loader2 } from "lucide-react";
import { ApiError } from "@/lib/axios";
import { Button } from "@/components/ui/button";
export function QueryState({
  error,
  retry,
}: {
  error?: Error | null;
  retry?: () => void;
}) {
  const { t, has } = useLang();
  return (
    <div
      role={error ? "alert" : "status"}
      className="flex min-h-64 flex-col items-center justify-center gap-4 rounded-2xl bg-card p-8 text-center shadow-card"
    >
      {error ? (
        <AlertCircle className="text-warning" />
      ) : (
        <Loader2 className="animate-spin text-primary" />
      )}
      <p>
        {error
          ? t(
              error instanceof ApiError && has(error.code)
                ? error.code
                : "requestFailed",
            )
          : t("loading")}
      </p>
      {error && retry && (
        <Button variant="outline" className="rounded-full" onClick={retry}>
          {t("retry")}
        </Button>
      )}
    </div>
  );
}
