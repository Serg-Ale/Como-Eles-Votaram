import { generateSlug } from "@/lib/search/slug";

jest.mock("@/trpc/server", () => ({
  api: {
    parlamentar: {
      listForSitemap: jest.fn(),
    },
  },
}));

const { api } = jest.requireMock("@/trpc/server") as {
  api: {
    parlamentar: {
      listForSitemap: jest.Mock;
    };
  };
};

describe("sitemap", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should generate sitemap with static and dynamic routes", async () => {
    const mockParlamentares = [
      {
        id: "dep-12345",
        nome: "João Silva",
        camara: "camara",
        updatedAt: new Date("2026-02-01"),
      },
      {
        id: "sen-67890",
        nome: "Maria Santos",
        camara: "senado",
        updatedAt: new Date("2026-02-15"),
      },
    ];

    api.parlamentar.listForSitemap.mockResolvedValue(mockParlamentares);

    const sitemap = await import("../sitemap");
    const routes = await sitemap.default();

    expect(routes).toBeInstanceOf(Array);
    expect(routes.length).toBeGreaterThanOrEqual(2);

    const staticHome = routes.find((r) => r.url?.endsWith("/"));
    expect(staticHome).toBeDefined();
    expect(staticHome?.changeFrequency).toBe("daily");
    expect(staticHome?.priority).toBe(1.0);

    const staticBusca = routes.find((r) => r.url?.includes("/busca"));
    expect(staticBusca).toBeDefined();
    expect(staticBusca?.changeFrequency).toBe("weekly");
    expect(staticBusca?.priority).toBe(0.7);
  });

  it("should generate correct URLs for deputados", async () => {
    const mockParlamentares = [
      {
        id: "dep-12345",
        nome: "João Silva",
        camara: "camara",
        updatedAt: new Date("2026-02-01"),
      },
    ];

    api.parlamentar.listForSitemap.mockResolvedValue(mockParlamentares);

    const sitemap = await import("../sitemap");
    const routes = await sitemap.default();

    const deputadoRoute = routes.find((r) => r.url?.includes("/deputados/"));
    
    expect(deputadoRoute).toBeDefined();
    expect(deputadoRoute?.url).toContain("/deputados/dep-12345-");
    expect(deputadoRoute?.url).toContain(generateSlug("João Silva"));
    expect(deputadoRoute?.changeFrequency).toBe("weekly");
    expect(deputadoRoute?.priority).toBe(0.8);
    expect(deputadoRoute?.lastModified).toEqual(new Date("2026-02-01"));
  });

  it("should generate correct URLs for senadores", async () => {
    const mockParlamentares = [
      {
        id: "sen-67890",
        nome: "Maria Santos",
        camara: "senado",
        updatedAt: new Date("2026-02-15"),
      },
    ];

    api.parlamentar.listForSitemap.mockResolvedValue(mockParlamentares);

    const sitemap = await import("../sitemap");
    const routes = await sitemap.default();

    const senadorRoute = routes.find((r) => r.url?.includes("/senadores/"));
    
    expect(senadorRoute).toBeDefined();
    expect(senadorRoute?.url).toContain("/senadores/sen-67890-");
    expect(senadorRoute?.url).toContain(generateSlug("Maria Santos"));
    expect(senadorRoute?.changeFrequency).toBe("weekly");
    expect(senadorRoute?.priority).toBe(0.8);
  });

  it("should handle empty parlamentares list", async () => {
    api.parlamentar.listForSitemap.mockResolvedValue([]);

    const sitemap = await import("../sitemap");
    const routes = await sitemap.default();

    expect(routes.length).toBe(2);
    
    const urls = routes.map((r) => r.url);
    expect(urls.some((url) => url?.endsWith("/"))).toBe(true);
    expect(urls.some((url) => url?.includes("/busca"))).toBe(true);
  });

  it("should use correct base URL from environment", async () => {
    const originalEnv = process.env.NEXT_PUBLIC_BASE_URL;
    
    delete require.cache[require.resolve("../sitemap")];
    
    process.env.NEXT_PUBLIC_BASE_URL = "https://example.com";

    api.parlamentar.listForSitemap.mockResolvedValue([]);

    const sitemap = await import("../sitemap");
    const routes = await sitemap.default();

    const homeRoute = routes.find((r) => r.url?.endsWith("/"));
    expect(homeRoute?.url).toMatch(/^https?:\/\//);
    expect(routes.length).toBeGreaterThanOrEqual(2);

    process.env.NEXT_PUBLIC_BASE_URL = originalEnv;
  });
});
