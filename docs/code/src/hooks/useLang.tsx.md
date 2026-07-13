# useLang.tsx

Source: `src/hooks/useLang.tsx` (155 lines)

> Client component (`'use client'`).

## Imports

- `react`
- `@/i18n/en.json`
- `@/i18n/es.json`
- `@/i18n/ar.json`

## Exports

- `LANG_STORAGE_KEY`
- `DEFAULT_LANG`
- `LangCode`
- `Dir`
- `LANGUAGES`
- `Translate`
- `LangProvider`
- `useLang`

## Hooks used

- `useEffect`
- `useLang`
- `useContext`

## Renders

- `<LangContextValue>`
- `<LangCode>`
- `<LangContext.Provider>`
- `<LangProvider>`

## Outline

- `LANG_STORAGE_KEY` (const) - line 24
- `DEFAULT_LANG` (const) - line 25
- `LangCode` (type) - line 27
- `Dir` (type) - line 28
- `Language` (type) - line 30
- `LANGUAGES` (const) - line 33
- `Dict` (type) - line 39
- `DICTIONARIES` (const) - line 41
- `RTL_LANGS` (const) - line 42
- `Translate` (type) - line 45
- `LangContextValue` (type) - line 50
- `LangContext` (const) - line 60
- `lookup` (function) - line 62
- `interpolate` (function) - line 71
- `applyDocumentLang` (function) - line 81
- `detectInitialLang` (function) - line 87
- `LangProvider` (function) - line 100
- `useLang` (function) - line 148

## Imported by

- `src/app/error.tsx`
- `src/app/layout.tsx`
- `src/app/not-found.tsx`
- `src/components/auth/AuthShowcase.tsx`
- `src/components/auth/OtpForm.tsx`
- `src/components/dashboard/DashboardHome.tsx`
- `src/components/dashboard/DashboardShell.tsx`
- `src/components/dashboard/NotificationsMenu.tsx`
