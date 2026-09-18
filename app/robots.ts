import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.SITE_URL || "https://thefunktion.at";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/scan", "/api"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
