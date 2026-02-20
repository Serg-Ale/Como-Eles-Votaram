import { generateSlug, parseSlug, buildProfileUrl } from "../slug";

describe("Slug utilities", () => {
  describe("generateSlug", () => {
    it("should normalize accents correctly", () => {
      expect(generateSlug("João da Silva")).toBe("joao-da-silva");
    });

    it("should normalize multiple accented characters", () => {
      expect(generateSlug("José María Gonçalves")).toBe(
        "jose-maria-goncalves"
      );
    });

    it("should normalize uppercase with accents", () => {
      expect(generateSlug("LÚCIA ÂNGELA")).toBe("lucia-angela");
    });

    it("should collapse multiple spaces into single hyphen", () => {
      expect(generateSlug("João  da  Silva")).toBe("joao-da-silva");
    });

    it("should remove special characters", () => {
      expect(generateSlug("Maria da Silva-Santos")).toBe("maria-da-silva-santos");
    });

    it("should handle empty string", () => {
      expect(generateSlug("")).toBe("");
    });

    it("should handle single word", () => {
      expect(generateSlug("José")).toBe("jose");
    });

    it("should lowercase all characters", () => {
      expect(generateSlug("JOÃO SILVA")).toBe("joao-silva");
    });

    it("should handle names with middle initials", () => {
      expect(generateSlug("Maria dos Santos Oliveira")).toBe(
        "maria-dos-santos-oliveira"
      );
    });
  });

  describe("parseSlug", () => {
    it("should parse slug with two-part ID and name", () => {
      const result = parseSlug("dep-123-joao-silva");
      expect(result.id).toBe("dep-123");
      expect(result.nameSlug).toBe("joao-silva");
    });

    it("should parse slug with senator ID", () => {
      const result = parseSlug("sen-456-maria-santos");
      expect(result.id).toBe("sen-456");
      expect(result.nameSlug).toBe("maria-santos");
    });

    it("should parse slug with long ID number", () => {
      const result = parseSlug("dep-204521-jose-maria");
      expect(result.id).toBe("dep-204521");
      expect(result.nameSlug).toBe("jose-maria");
    });

    it("should handle slug with many name parts", () => {
      const result = parseSlug("dep-789-joao-da-silva-santos");
      expect(result.id).toBe("dep-789");
      expect(result.nameSlug).toBe("joao-da-silva-santos");
    });

    it("should handle single hyphen in name", () => {
      const result = parseSlug("sen-123-maria-santos-silva");
      expect(result.id).toBe("sen-123");
      expect(result.nameSlug).toBe("maria-santos-silva");
    });
  });

  describe("buildProfileUrl", () => {
    it("should build URL for deputy", () => {
      const url = buildProfileUrl({
        id: "dep-123",
        nome: "João Silva",
        camara: "camara",
      });
      expect(url).toBe("/deputados/dep-123-joao-silva");
    });

    it("should build URL for senator", () => {
      const url = buildProfileUrl({
        id: "sen-456",
        nome: "Maria Santos",
        camara: "senado",
      });
      expect(url).toBe("/senadores/sen-456-maria-santos");
    });

    it("should normalize accents in URL", () => {
      const url = buildProfileUrl({
        id: "dep-789",
        nome: "José María Gonçalves",
        camara: "camara",
      });
      expect(url).toBe("/deputados/dep-789-jose-maria-goncalves");
    });

    it("should handle complex names", () => {
      const url = buildProfileUrl({
        id: "sen-111",
        nome: "Maria da Silva Oliveira",
        camara: "senado",
      });
      expect(url).toBe("/senadores/sen-111-maria-da-silva-oliveira");
    });

    it("should distinguish between camara and senado", () => {
      const camaraUrl = buildProfileUrl({
        id: "test-1",
        nome: "Test Name",
        camara: "camara",
      });
      const senadoUrl = buildProfileUrl({
        id: "test-1",
        nome: "Test Name",
        camara: "senado",
      });

      expect(camaraUrl).toContain("/deputados/");
      expect(senadoUrl).toContain("/senadores/");
    });
  });
});
