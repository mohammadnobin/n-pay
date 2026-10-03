"use client";
import { useQuery } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { queryKeys } from "@/lib/query-keys";
import { isDemo } from "@/lib/axios";
import Link from "next/link";
import { QueryState } from "@/components/share/QueryState";
import { useLang } from "@/hooks/useLang";
import { Button } from "@/components/ui/button";

/** Gate for every `/dashboard` route: the app has one audience, so a valid
 *  session is all that is checked. Authorization itself stays server-side. */
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { t } = useLang();
  const session = useQuery({
    queryKey: queryKeys.auth.session,
    queryFn: authService.session,
    retry: false,
  });
  if (isDemo) return children;
  if (session.isPending) return <QueryState />;
  if (session.isError)
    return (
      <div className="space-y-4">
        <QueryState error={session.error} retry={() => session.refetch()} />
        <Button asChild className="rounded-full">
          <Link href="/login">{t("login")}</Link>
        </Button>
      </div>
    );
  return children;
}
