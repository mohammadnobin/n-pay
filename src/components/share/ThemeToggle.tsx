"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useLang } from "@/hooks/useLang";
import { Button } from "@/components/ui/button";
export function ThemeToggle() {
  const { t } = useLang();
  const { setTheme } = useTheme();
  return (
    <>
      <Button
        size="icon"
        variant="ghost"
        className="rounded-full dark:hidden"
        aria-label={t("darkTheme")}
        onClick={() => setTheme("dark")}
      >
        <Moon size={19} />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        className="hidden rounded-full dark:inline-flex"
        aria-label={t("lightTheme")}
        onClick={() => setTheme("light")}
      >
        <Sun size={19} />
      </Button>
    </>
  );
}
