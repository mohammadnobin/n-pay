export const dynamic = "force-static";
import type { MetadataRoute } from "next";
import { env } from "@/config/env";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: env.isDemo
      ? { userAgent: "*", disallow: "/" }
      : {
          userAgent: "*",
          allow: "/",
          disallow: [
            "/dashboard",
            "/pay",
            "/transactions",
            "/wallet",
            "/kyc",
            "/profile",
            "/security",
            "/settings",
            "/login",
            "/register",
            "/otp",
          ],
        },
    sitemap: `${env.siteUrl}/sitemap.xml`,
  };
}
