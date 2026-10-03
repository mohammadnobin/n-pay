"use client";

import { useId, useState, type ReactNode, type Ref } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Command } from "cmdk";
import { Check, ChevronDown, ChevronUp, Search } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  keywords?: string[];
  disabled?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onValueChange: (value: string) => void;
  label: string;
  placeholder?: string;
  /** Long lists are searchable automatically; enable explicitly for countries. */
  searchable?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  describedBy?: string;
  id?: string;
  name?: string;
  onBlur?: () => void;
  ref?: Ref<HTMLButtonElement>;
  className?: string;
  icon?: ReactNode;
  /** Compact circular icon trigger, for a collapsed icon-rail sidebar. */
  iconOnly?: boolean;
}

const triggerClass =
  "group flex h-11 w-full min-w-0 items-center gap-2.5 rounded-full border border-border bg-card px-3.5 text-start text-sm font-medium text-foreground outline-none transition-colors hover:border-primary/40 hover:bg-muted/30 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/15 aria-invalid:border-red-500 aria-invalid:ring-red-500/15 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:border-primary/60 data-[state=open]:ring-3 data-[state=open]:ring-primary/10";
const iconTriggerClass =
  "flex size-11 shrink-0 items-center justify-center rounded-full text-muted-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-primary/15 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-muted data-[state=open]:text-primary";
const panelClass =
  "z-50 overflow-hidden rounded-xl bg-card p-1.5 text-foreground shadow-lg shadow-black/10 dark:shadow-black/40";
const itemClass =
  "relative flex min-h-10 cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2.5 text-sm outline-none";

export function Select({
  options,
  value,
  onValueChange,
  label,
  placeholder,
  searchable,
  disabled,
  invalid,
  describedBy,
  id,
  name,
  onBlur,
  ref,
  className,
  icon,
  iconOnly,
}: SelectProps) {
  const { t, dir: direction } = useLang();
  const [open, setOpen] = useState(false);
  const contentId = useId();
  const selected = options.find((option) => option.value === value);
  const hasSearch = searchable ?? options.length > 6;
  const placeholderText = placeholder ?? t("selectOption");
  const triggerProps = {
    id,
    ref,
    disabled,
    onBlur,
    "aria-label": label,
    "aria-invalid": invalid,
    "aria-describedby": describedBy,
    className: cn(iconOnly ? iconTriggerClass : triggerClass, className),
  };
  const content = iconOnly ? (
    <span aria-hidden="true">{icon}</span>
  ) : (
    <>
      {icon && (
        <span className="shrink-0 text-muted-foreground" aria-hidden="true">
          {icon}
        </span>
      )}
      <span
        className={cn(
          "min-w-0 flex-1 truncate",
          !selected && "font-normal text-muted-foreground",
        )}
      >
        {selected?.label ?? placeholderText}
      </span>
      <ChevronDown
        size={16}
        aria-hidden="true"
        className="shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-180"
      />
    </>
  );

  if (hasSearch)
    return (
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        <PopoverPrimitive.Trigger asChild>
          <button
            {...triggerProps}
            type="button"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls={open ? contentId : undefined}
          >
            {content}
          </button>
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            id={contentId}
            dir={direction}
            aria-label={label}
            align="start"
            sideOffset={6}
            collisionPadding={12}
            className={cn(
              panelClass,
              "w-[var(--radix-popover-trigger-width)] min-w-48 max-w-[calc(100vw-1.5rem)] p-0",
            )}
          >
            <Command label={label} loop>
              <div className="flex items-center gap-2.5 border-b border-border px-3.5">
                <Search
                  size={17}
                  className="shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
                <Command.Input
                  autoFocus
                  placeholder={t("searchOptions")}
                  aria-label={t("searchOptions")}
                  className="h-12 min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>
              <Command.List
                className="max-h-[min(18rem,calc(var(--radix-popover-content-available-height)-3.5rem))] scroll-py-1.5 overflow-y-auto overscroll-contain p-1.5"
                aria-label={label}
              >
                <Command.Empty className="px-4 py-8 text-center text-sm text-muted-foreground">
                  {t("noOptionsFound")}
                </Command.Empty>
                {options.map((option) => (
                  <Command.Item
                    key={option.value}
                    value={option.value}
                    keywords={[
                      option.label,
                      option.description ?? "",
                      ...(option.keywords ?? []),
                    ]}
                    disabled={option.disabled}
                    onSelect={() => {
                      onValueChange(option.value);
                      setOpen(false);
                    }}
                    className={cn(
                      itemClass,
                      "data-[selected=true]:bg-accent data-[selected=true]:text-primary data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-40",
                    )}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block break-words">{option.label}</span>
                      {option.description && (
                        <span className="mt-0.5 block text-xs text-muted-foreground">
                          {option.description}
                        </span>
                      )}
                    </span>
                    <Check
                      size={16}
                      aria-hidden="true"
                      className={cn(
                        "shrink-0 text-primary",
                        value !== option.value && "invisible",
                      )}
                    />
                    {value === option.value && (
                      <span className="sr-only">{t("selectedOption")}</span>
                    )}
                  </Command.Item>
                ))}
              </Command.List>
            </Command>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    );

  return (
    <SelectPrimitive.Root
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      name={name}
      dir={direction}
    >
      <SelectPrimitive.Trigger {...triggerProps}>
        {content}
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          dir={direction}
          position="popper"
          align="start"
          sideOffset={6}
          collisionPadding={12}
          className={cn(
            panelClass,
            "min-w-[var(--radix-select-trigger-width)] max-w-[calc(100vw-1.5rem)] max-h-[min(20rem,var(--radix-select-content-available-height))]",
          )}
        >
          <SelectPrimitive.ScrollUpButton className="flex h-6 items-center justify-center text-muted-foreground">
            <ChevronUp size={15} />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport className="scroll-py-1.5">
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                textValue={option.label}
                className={cn(
                  itemClass,
                  "pe-10 data-[highlighted]:bg-accent data-[highlighted]:text-primary data-[state=checked]:font-semibold data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
                )}
              >
                <SelectPrimitive.ItemText>
                  {option.label}
                </SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="absolute end-3 flex text-primary">
                  <Check size={16} />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton className="flex h-6 items-center justify-center text-muted-foreground">
            <ChevronDown size={15} />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
