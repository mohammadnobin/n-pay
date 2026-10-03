"use client";
import { useSearchParams } from "next/navigation";
import { TransactionDetails } from "./TransactionDetails";

/** Reads the record to show from the query string, so the route itself stays
 *  a single static file. A missing or unknown id falls through to the empty
 *  state inside `TransactionDetails`. */
export function TransactionDetailsRoute() {
  const id = useSearchParams().get("id") ?? "";
  return <TransactionDetails id={id} />;
}
