import { test } from "node:test";
import assert from "node:assert/strict";
import { authSchema, otpSchema, phoneSchema } from "./auth.schema";
import { paymentSchema, merchantSchema } from "./payment.schema";
test("phone identity rejects local formats and oversized numbers", () => {
  for (const phone of [
    "07700900123",
    "abc",
    "+0123456789",
    "+1234567890123456",
  ])
    assert.equal(phoneSchema.safeParse(phone).success, false);
  assert.equal(phoneSchema.safeParse("+447700900123").success, true);
});
test("phone registration requires explicit consent", () => {
  assert.equal(
    authSchema.safeParse({
      phone: "+447700900123",
      country: "GB",
      consent: false,
    }).success,
    false,
  );
});
test("OTP keeps leading zeroes and rejects malformed codes", () => {
  assert.equal(otpSchema.parse({ code: "012345" }).code, "012345");
  for (const code of ["12345", "1234567", "1234a6", " 123456"])
    assert.equal(otpSchema.safeParse({ code }).success, false);
});
test("payment rejects negative, zero, exponent, excessive precision and excessive amounts", () => {
  for (const amount of [
    "0",
    "-1",
    "1e3",
    "12.345",
    "100000.01",
    "Infinity",
    "NaN",
    "",
  ])
    assert.equal(
      paymentSchema.safeParse({ amount, walletId: "wallet-1" }).success,
      false,
      amount,
    );
  for (const amount of ["0.01", "100000", "123.45"])
    assert.equal(
      paymentSchema.safeParse({ amount, walletId: "wallet-1" }).success,
      true,
      amount,
    );
});
test("payment cannot proceed without wallet selection or merchant code", () => {
  assert.equal(
    paymentSchema.safeParse({ amount: "12", walletId: "" }).success,
    false,
  );
  assert.equal(merchantSchema.safeParse({ qr: "  " }).success, false);
});
