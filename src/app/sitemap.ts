import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

const publicRoutes = ["/", "/projects", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
  }));
}
