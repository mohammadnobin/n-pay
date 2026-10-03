"use client";
import { useEffect } from "react";
import { flushSync } from "react-dom";
import { z } from "zod";
import type { Transaction } from "@/types";
const schema = z
  .object({
    search: z.string().max(200),
    status: z.enum(["all", "completed", "pending", "failed"]),
  })
  .strict();
interface ModelContext {
  registerTool: (
    tool: {
      name: string;
      description: string;
      inputSchema: object;
      annotations: { readOnlyHint: boolean; untrustedContentHint: boolean };
      execute: (input: unknown) => unknown;
    },
    options: { signal: AbortSignal },
  ) => void | Promise<void>;
}
export function useTransactionTools(
  transactions: Transaction[],
  setSearch: (v: string) => void,
  setStatus: (v: string) => void,
) {
  useEffect(() => {
    const context = (document as Document & { modelContext?: ModelContext })
      .modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    try {
      void Promise.resolve(
        context.registerTool(
          {
            name: "filter_transactions",
            description:
              "Filter the visible transaction list by merchant or reference and status. Does not make payments or change records.",
            inputSchema: {
              type: "object",
              properties: {
                search: { type: "string", maxLength: 200 },
                status: {
                  type: "string",
                  enum: ["all", "completed", "pending", "failed"],
                },
              },
              required: ["search", "status"],
              additionalProperties: false,
            },
            annotations: { readOnlyHint: false, untrustedContentHint: true },
            execute(input) {
              const { search, status } = schema.parse(input);
              flushSync(() => {
                setSearch(search);
                setStatus(status);
              });
              return {
                transactions: transactions
                  .filter(
                    (tx) =>
                      (status === "all" || tx.status === status) &&
                      `${tx.merchant} ${tx.id} ${tx.reference}`
                        .toLowerCase()
                        .includes(search.toLowerCase()),
                  )
                  .map((tx) => ({
                    reference: tx.id,
                    merchant: tx.merchant,
                    status: tx.status,
                    amount: tx.amount,
                    asset: tx.asset,
                  })),
              };
            },
          },
          { signal: lifecycle.signal },
        ),
      ).catch(() => {});
    } catch {
      /* Optional browser capability. */
    }
    return () => lifecycle.abort();
  }, [transactions, setSearch, setStatus]);
}
