"use client";
import { Globe2 } from "lucide-react";
import { Select } from "@/components/ui/select";
import { useLang, type LangCode } from "@/hooks/useLang";
export function LanguageSwitcher({
  className,
  iconOnly,
}: {
  className?: string;
  iconOnly?: boolean;
}) {
  const { t, lang, setLang, languages } = useLang();
  return (
    <Select
      className={iconOnly ? undefined : className ?? "w-full"}
      label={t("language")}
      value={lang}
      onValueChange={(value) => setLang(value as LangCode)}
      icon={<Globe2 size={iconOnly ? 18 : 16} />}
      iconOnly={iconOnly}
      options={languages.map((language) => ({
        value: language.code,
        label: language.name,
      }))}
    />
  );
}
