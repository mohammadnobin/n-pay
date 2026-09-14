# TwoFactorAuth.tsx

Source: `src/components/dashboard/page/security/TwoFactorAuth.tsx` (202 lines)

> Client component (`'use client'`).

## Imports

- `react`
- `react-hook-form`
- `@hookform/resolvers/zod`
- `sonner`
- `lucide-react`
- `@/hooks/useLang`
- `@/hooks/useSecurity`
- `@/hooks/useEditableProfile`
- `@/components/ui/card`
- `@/components/ui/button`
- `@/components/share/IconInput`
- `@/components/share/PageHeading`
- `@/schemas/security.schema`

## Exports

- `TwoFactorAuth`

## Hooks used

- `useLang`
- `useSecurity`
- `useEditableProfile`
- `useState`

## Renders

- `<Copy>`
- `<TwoFactorCodeValues>`
- `<PageHeading>`
- `<Card>`
- `<ShieldCheck>`
- `<Button>`
- `<ShieldOff>`
- `<QrCode>`
- `<InfoRow>`
- `<IconInput>`

## Outline

- `BASE32_ALPHABET` (const) - line 19
- `generateBase32Secret` (function) - line 21
- `InfoRow` (function) - line 29
- `TwoFactorAuth` (function) - line 63

## Imported by

- `src/app/(dashboard)/security/two-factor/page.tsx`

## Stats

| Lines | Blank | Comment | Code |
| --- | --- | --- | --- |
| 202 | 13 | 0 | 189 |

