import { MetadataRoute } from "next";

const SITE_URL = "https://chroniques-de-jez.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
