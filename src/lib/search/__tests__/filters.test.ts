import { parseSearchParams, buildSearchParams, type SearchFilters } from "../filters";

describe("SearchFilters utilities", () => {
  describe("parseSearchParams", () => {
    it("should parse all filter fields", () => {
      const params = new URLSearchParams("q=joao&partido=PT&uf=SP&camara=camara");
      const result = parseSearchParams(params);

      expect(result.q).toBe("joao");
      expect(result.partido).toBe("PT");
      expect(result.uf).toBe("SP");
      expect(result.camara).toBe("camara");
    });

    it("should handle partial filters", () => {
      const params = new URLSearchParams("q=maria&uf=RJ");
      const result = parseSearchParams(params);

      expect(result.q).toBe("maria");
      expect(result.uf).toBe("RJ");
      expect(result.partido).toBeUndefined();
      expect(result.camara).toBeUndefined();
    });

    it("should handle empty search params", () => {
      const params = new URLSearchParams("");
      const result = parseSearchParams(params);

      expect(result.q).toBeUndefined();
      expect(result.partido).toBeUndefined();
      expect(result.uf).toBeUndefined();
      expect(result.camara).toBeUndefined();
    });

    it("should parse senado chamber value", () => {
      const params = new URLSearchParams("camara=senado");
      const result = parseSearchParams(params);

      expect(result.camara).toBe("senado");
    });

    it("should parse todas chamber value", () => {
      const params = new URLSearchParams("camara=todas");
      const result = parseSearchParams(params);

      expect(result.camara).toBe("todas");
    });

    it("should handle URL encoded values", () => {
      const params = new URLSearchParams("q=Jos%C3%A9%20Silva");
      const result = parseSearchParams(params);

      expect(result.q).toBe("José Silva");
    });
  });

  describe("buildSearchParams", () => {
    it("should build query string with all filters", () => {
      const filters: SearchFilters = {
        q: "joao",
        partido: "PT",
        uf: "SP",
        camara: "camara",
      };

      const result = buildSearchParams(filters);

      expect(result).toContain("q=joao");
      expect(result).toContain("partido=PT");
      expect(result).toContain("uf=SP");
      expect(result).toContain("camara=camara");
    });

    it("should omit undefined filters", () => {
      const filters: SearchFilters = {
        q: "maria",
        partido: undefined,
        uf: "RJ",
        camara: undefined,
      };

      const result = buildSearchParams(filters);

      expect(result).toContain("q=maria");
      expect(result).toContain("uf=RJ");
      expect(result).not.toContain("partido");
      expect(result).not.toContain("camara");
    });

    it("should return empty string for empty filters", () => {
      const filters: SearchFilters = {};
      const result = buildSearchParams(filters);

      expect(result).toBe("");
    });

    it("should URL encode special characters", () => {
      const filters: SearchFilters = {
        q: "José Silva",
      };

      const result = buildSearchParams(filters);

      expect(result).toContain("q=");
      expect(result).toContain("Silva");
    });

    it("should handle all chamber values", () => {
      const camaraFilter = buildSearchParams({ camara: "camara" });
      const senadoFilter = buildSearchParams({ camara: "senado" });
      const todasFilter = buildSearchParams({ camara: "todas" });

      expect(camaraFilter).toContain("camara=camara");
      expect(senadoFilter).toContain("camara=senado");
      expect(todasFilter).toContain("camara=todas");
    });
  });

  describe("Round-trip serialization", () => {
    it("should maintain filter values through parse → build → parse cycle", () => {
      const original: SearchFilters = {
        q: "joao silva",
        partido: "PSDB",
        uf: "MG",
        camara: "senado",
      };

      const queryString = buildSearchParams(original);
      const params = new URLSearchParams(queryString);
      const parsed = parseSearchParams(params);

      expect(parsed.q).toBe(original.q);
      expect(parsed.partido).toBe(original.partido);
      expect(parsed.uf).toBe(original.uf);
      expect(parsed.camara).toBe(original.camara);
    });

    it("should maintain empty fields through round-trip", () => {
      const original: SearchFilters = {
        q: "search term",
        partido: undefined,
        uf: undefined,
        camara: undefined,
      };

      const queryString = buildSearchParams(original);
      const params = new URLSearchParams(queryString);
      const parsed = parseSearchParams(params);

      expect(parsed.q).toBe(original.q);
      expect(parsed.partido).toBeUndefined();
      expect(parsed.uf).toBeUndefined();
      expect(parsed.camara).toBeUndefined();
    });
  });
});
