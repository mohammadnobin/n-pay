"use client";

// Lightweight i18n (no routing segment). Dictionaries are plain JSON imported
// at build time. The provider persists the choice to localStorage("nomipay_lang")
// and exposes a `t(key, values?)` lookup plus the language list for the switcher.
//
// To keep server and client first-render identical (no hydration mismatch), we
// start at the default language and apply the saved/browser language in a
// post-mount effect. Arabic switches the document to RTL automatically.

import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import en from "@/i18n/en.json";
import es from "@/i18n/es.json";
import ar from "@/i18n/ar.json";

export const LANG_STORAGE_KEY = "nomipay_lang";
export const DEFAULT_LANG = "en";

export type LangCode = "en" | "es" | "ar";
export type Dir = "rtl" | "ltr";

type Language = { code: LangCode; name: string };

// Native names are intentional — a language menu should read in its own tongue.
export const LANGUAGES: Language[] = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "ar", name: "العربية" },
];

type Dict = Record<string, unknown>;

const DICTIONARIES: Record<string, Dict> = { en, es, ar };
const RTL_LANGS: LangCode[] = ["ar"];

/** `t("rights", { year: 2026 })` fills `{year}` placeholders in the message. */
export type Translate = (
  key: string,
  values?: Record<string, string | number>,
) => string;

type LangContextValue = {
  lang: LangCode;
  setLang: (code: LangCode) => void;
  t: Translate;
  /** True when a key exists in the active or fallback dictionary. */
  has: (key: string) => boolean;
  languages: Language[];
  dir: Dir;
};

const LangContext = createContext<LangContextValue | null>(null);

function lookup(dict: Dict, key: string): unknown {
  return key
    .split(".")
    .reduce<unknown>(
      (node, part) => (node == null ? undefined : (node as Dict)[part]),
      dict,
    );
}

function interpolate(
  message: string,
  values?: Record<string, string | number>,
): string {
  if (!values) return message;
  return message.replace(/\{(\w+)\}/g, (match, name) =>
    name in values ? String(values[name]) : match,
  );
}

function applyDocumentLang(code: LangCode) {
  const el = document.documentElement;
  el.setAttribute("lang", code);
  el.setAttribute("dir", RTL_LANGS.includes(code) ? "rtl" : "ltr");
}

function detectInitialLang(): LangCode {
  let saved: string | null;
  try {
    saved = window.localStorage.getItem(LANG_STORAGE_KEY);
  } catch {
    saved = null;
  }
  const browser = window.navigator.language?.split("-")[0];
  return ([saved, browser, DEFAULT_LANG].find(
    (code) => code && DICTIONARIES[code],
  ) ?? DEFAULT_LANG) as LangCode;
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(DEFAULT_LANG as LangCode);

  useEffect(() => {
    const initial = detectInitialLang();
    applyDocumentLang(initial);
    startTransition(() => setLangState(initial));
  }, []);

  function setLang(code: LangCode) {
    if (!DICTIONARIES[code]) return;
    setLangState(code);
    applyDocumentLang(code);
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, code);
    } catch {
      // Ignore storage errors.
    }
  }

  // Resolve a dotted key against the active dictionary, falling back to English
  // and finally the key itself so missing strings are visible, not blank.
  const t: Translate = (key, values) => {
    const active = DICTIONARIES[lang] ?? DICTIONARIES[DEFAULT_LANG];
    const message =
      lookup(active, key) ?? lookup(DICTIONARIES[DEFAULT_LANG], key) ?? key;
    return interpolate(String(message), values);
  };

  function has(key: string) {
    return (
      lookup(DICTIONARIES[lang] ?? DICTIONARIES[DEFAULT_LANG], key) != null ||
      lookup(DICTIONARIES[DEFAULT_LANG], key) != null
    );
  }

  const value: LangContextValue = {
    lang,
    setLang,
    t,
    has,
    languages: LANGUAGES,
    dir: RTL_LANGS.includes(lang) ? "rtl" : "ltr",
  };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error("useLang must be used inside a <LangProvider>");
  }
  return ctx;
}
