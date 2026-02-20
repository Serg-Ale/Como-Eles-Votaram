import { generateWebSiteLD, generatePersonLD } from "../json-ld";

describe("json-ld", () => {
  describe("generateWebSiteLD", () => {
    it("should generate valid WebSite schema with SearchAction", () => {
      const schema = generateWebSiteLD();

      expect(schema["@context"]).toBe("https://schema.org");
      expect(schema["@type"]).toBe("WebSite");
      expect(schema.name).toBe("Como Eles Votaram");
      expect(schema.description).toContain("Transparência");
      expect(schema.url).toMatch(/^https?:\/\//);
      expect(schema.potentialAction).toBeDefined();
      expect(schema.potentialAction["@type"]).toBe("SearchAction");
      expect(schema.potentialAction.target).toBeDefined();
      expect(schema.potentialAction["query-input"]).toBe(
        "required name=search_term_string"
      );
    });

    it("should include proper search target URL", () => {
      const schema = generateWebSiteLD();
      const target = schema.potentialAction.target as { "@type": string; urlTemplate: string };

      expect(target["@type"]).toBe("EntryPoint");
      expect(target.urlTemplate).toContain("/busca");
      expect(target.urlTemplate).toContain("{search_term_string}");
    });
  });

  describe("generatePersonLD", () => {
    it("should generate valid Person schema for deputado", () => {
      const parlamentar = {
        id: "dep-12345",
        nome: "João Silva",
        nomeEleitoral: "João",
        partido: "PT",
        uf: "SP",
        camara: "camara" as const,
        email: "joao@example.com",
        urlFoto: "https://example.com/photo.jpg",
      };

      const schema = generatePersonLD(parlamentar);

      expect(schema["@context"]).toBe("https://schema.org");
      expect(schema["@type"]).toBe("Person");
      expect(schema.name).toBe("João Silva");
      expect(schema.alternateName).toBe("João");
      expect(schema.jobTitle).toBe("Deputado Federal");
      expect(schema.email).toBe("joao@example.com");
      expect(schema.image).toBe("https://example.com/photo.jpg");
      expect(schema.memberOf).toEqual({
        "@type": "Organization",
        name: "Câmara dos Deputados",
      });
      expect(schema.affiliation).toEqual({
        "@type": "Organization",
        name: "PT",
      });
      expect(schema.address).toEqual({
        "@type": "PostalAddress",
        addressRegion: "SP",
        addressCountry: "BR",
      });
    });

    it("should generate valid Person schema for senador", () => {
      const parlamentar = {
        id: "sen-67890",
        nome: "Maria Santos",
        nomeEleitoral: "Maria",
        partido: "PSDB",
        uf: "RJ",
        camara: "senado" as const,
        email: "maria@example.com",
        urlFoto: "https://example.com/photo2.jpg",
      };

      const schema = generatePersonLD(parlamentar);

      expect(schema["@type"]).toBe("Person");
      expect(schema.name).toBe("Maria Santos");
      expect(schema.jobTitle).toBe("Senador");
      expect(schema.memberOf).toEqual({
        "@type": "Organization",
        name: "Senado Federal",
      });
      expect(schema.affiliation).toEqual({
        "@type": "Organization",
        name: "PSDB",
      });
    });

    it("should handle missing optional fields gracefully", () => {
      const parlamentar = {
        id: "dep-99999",
        nome: "Pedro Costa",
        nomeEleitoral: "Pedro",
        partido: "PP",
        uf: "MG",
        camara: "camara" as const,
        email: null,
        urlFoto: null,
      };

      const schema = generatePersonLD(parlamentar);

      expect(schema["@type"]).toBe("Person");
      expect(schema.name).toBe("Pedro Costa");
      expect(schema.email).toBeUndefined();
      expect(schema.image).toBeUndefined();
    });
  });
});
