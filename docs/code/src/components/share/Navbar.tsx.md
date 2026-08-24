# Navbar.tsx

Source: `src/components/share/Navbar.tsx` (282 lines)

> Client component (`'use client'`).

## Imports

- `react`
- `next/link`
- `next/navigation`
- `lucide-react`
- `@/hooks/useLang`
- `@/lib/utils`
- `./Brand`
- `./LanguageSwitcher`
- `./ThemeToggle`
- `@/components/ui/button`
- `@/constants/routes`

## Exports

- `Navbar`

## Hooks used

- `useHeaderState`
- `useState`
- `useRef`
- `useEffect`
- `useMobileMenu`
- `usePathname`
- `usePreviewSignedIn`
- `useLang`

## Renders

- `<Brand>`
- `<Link>`
- `<LanguageSwitcher>`
- `<ThemeToggle>`
- `<Button>`
- `<ToggleRight>`
- `<ToggleLeft>`
- `<X>`
- `<Menu>`

## Outline

- `links` (const) - line 14
- `useHeaderState` (function) - line 24
- `useMobileMenu` (function) - line 51
- `PREVIEW_AUTH_KEY` (const) - line 89
- `usePreviewSignedIn` (function) - line 91
- `Navbar` (function) - line 121

## Imported by

- `src/app/(template)/layout.tsx`

## Stats

| Lines | Blank | Comment | Code |
| --- | --- | --- | --- |
| 282 | 21 | 28 | 233 |

