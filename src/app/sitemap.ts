import type { MetadataRoute } from "next";
import { api } from "@/trpc/server";
import { generateSlug } from "@/lib/search/slug";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/busca`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const parlamentares = await api.parlamentar.listForSitemap();

  const dynamicRoutes: MetadataRoute.Sitemap = parlamentares.map((p) => {
    const chamber = p.camara === "senado" ? "senadores" : "deputados";
    const slug = generateSlug(p.nome);

    return {
      url: `${BASE_URL}/${chamber}/${p.id}-${slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    };
  });

  return [...staticRoutes, ...dynamicRoutes];
}
