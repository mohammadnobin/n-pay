import { Brand } from "@/components/share/Brand";
import { Preferences } from "@/components/share/Preferences";
import { AuthShowcase } from "@/components/auth/AuthShowcase";

/** Form on the start side, product showcase on the end side. The showcase is
 *  decoration, so it drops away below `lg` and the form keeps the full width.
 *  The showcase column grows at `xl`, where there is room to spare without
 *  squeezing the form. The page itself is the form's background — there is no
 *  separate card — so only the showcase panel stands out as a distinct shape. */
export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-card lg:grid lg:grid-cols-[minmax(0,1fr)_1.05fr] lg:items-start lg:gap-6 lg:p-6 xl:grid-cols-[minmax(0,1fr)_1.2fr]">
      <div className="flex flex-col lg:min-h-[calc(100vh-3rem)]">
        <header className="mx-auto flex w-full max-w-lg flex-wrap items-center justify-between gap-4 px-5 py-8">
          <Brand />
          <Preferences />
        </header>
        <main className="flex flex-1 items-center">
          <div className="mx-auto w-full max-w-lg px-5 py-8 sm:px-10 sm:py-12">
            {children}
          </div>
        </main>
      </div>
      <AuthShowcase />
    </div>
  );
}
