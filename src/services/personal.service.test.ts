import { test } from "node:test";
import assert from "node:assert/strict";

test("demo disconnect removes the connection across wallet and overview reads without changing history or fixtures", async () => {
  const previous = process.env.NEXT_PUBLIC_DEMO_MODE;
  process.env.NEXT_PUBLIC_DEMO_MODE = "true";
  const { personalService } = await import("./personal.service");
  const { useDemoWalletStore } = await import("@/store/demoWalletStore");
  const { demoOverview } = await import("./demo-data");
  try {
    const initial = await personalService.overview();
    const wallet = initial.wallets[0];
    assert.ok(wallet);
    await personalService.disconnectWallet(wallet.id);
    await personalService.disconnectWallet(wallet.id);
    assert.deepEqual(await personalService.wallets(), []);
    const updated = await personalService.overview();
    assert.deepEqual(updated.wallets, []);
    assert.deepEqual(updated.transactions, initial.transactions);
    assert.equal(demoOverview.wallets.length, 1);
    // The single-wallet guard allows a new provider session; the demo itself has no provider.
    await assert.rejects(personalService.startWalletLink("Phantom"), {
      message: "providerUnavailable",
    });
  } finally {
    useDemoWalletStore.setState({ disconnectedIds: [] });
    if (previous === undefined)
      Reflect.deleteProperty(process.env, "NEXT_PUBLIC_DEMO_MODE");
    else process.env.NEXT_PUBLIC_DEMO_MODE = previous;
  }
});
