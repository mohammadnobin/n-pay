export function openProvider(url: string) {
  const target = new URL(url);
  if (target.protocol !== "https:" || target.username || target.password)
    throw new Error("requestFailed");
  window.location.assign(target.href);
}
