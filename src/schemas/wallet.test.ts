import { test } from "node:test";
import assert from "node:assert/strict";
import { canLinkWallet, walletConnectionsSchema } from "./wallet.schema";
import type { Wallet } from "@/types";
const wallet: Wallet = {
  id: "w1",
  name: "MetaMask",
  address: "0x123",
  network: "Ethereum",
  asset: "USDC",
  balance: 100,
  usdValue: 100,
};
test("allows first link but prevents every additional connection", () => {
  assert.equal(canLinkWallet([], "MetaMask"), true);
  assert.equal(canLinkWallet([wallet], "Phantom"), false);
  assert.equal(canLinkWallet([wallet], "MetaMask"), false);
});
test("new device may reauthorize only the existing provider", () => {
  assert.equal(canLinkWallet([wallet], "MetaMask", true), true);
  assert.equal(canLinkWallet([wallet], "Phantom", true), false);
});
test("rejects legacy multiple connections instead of silently selecting one", () => {
  assert.equal(walletConnectionsSchema.safeParse([]).success, true);
  assert.equal(walletConnectionsSchema.safeParse([wallet]).success, true);
  assert.equal(
    walletConnectionsSchema.safeParse([wallet, { ...wallet, id: "w2" }])
      .success,
    false,
  );
  assert.equal(
    canLinkWallet([wallet, { ...wallet, id: "w2" }], "MetaMask", true),
    false,
  );
});
