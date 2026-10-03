export const dynamic = "force-static";
import type { MetadataRoute } from "next";
import { env } from "@/config/env";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/how-it-works", "/safety", "/support"].map((path) => ({
    url: `${env.siteUrl}${path}`,
  }));
}
