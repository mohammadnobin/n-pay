import type { NextConfig } from "next";
const config: NextConfig = {
  poweredByHeader: false,
  turbopack: { root: process.cwd() },
  reactStrictMode: true,
  // `next dev` only trusts localhost and the host it was started with. Phones
  // and laptops on the same network reach the dev server by LAN IP, so the
  // private ranges are allowed too — development only, never production.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.16.*.*"],
  // Images are served straight from `public/`, so the browser never calls the
  // `/_next/image` optimizer endpoint. Keeps every route free of runtime requests.
  images: { unoptimized: true },
  // The whole site ships as files: `next build` writes `out/`, which any
  // static host can serve as-is. Nothing here may depend on a request, so
  // there are no dynamic routes — a record is addressed by a query string
  // (`/transactions/details?id=…`) and read on the client.
  output: "export",
};
export default config;
