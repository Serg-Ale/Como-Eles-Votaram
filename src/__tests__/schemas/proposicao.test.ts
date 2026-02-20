import { ProposicaoSchema } from "@/lib/schemas/proposicao.schema";

describe("ProposicaoSchema", () => {
  it("should validate valid proposicao data", () => {
    const valid = {
      id: "clz4x8h7k0000qz8h8h8h8h8h",
      externalId: 123456,
      tipo: "PL",
      numero: 123,
      ano: 2024,
      ementa: "Dispõe sobre...",
      dataApresentacao: new Date("2024-02-15"),
      urlInteiro: "https://example.com/proposicao.pdf",
      camara: "camara",
      autorId: "dep-204521",
    };

    const result = ProposicaoSchema.parse(valid);
    expect(result.externalId).toBe(123456);
    expect(result.tipo).toBe("PL");
  });

  it("should validate proposicao without optional fields", () => {
    const valid = {
      id: "clz4x8h7k0000qz8h8h8h8h8h",
      externalId: 123456,
      tipo: "PEC",
      numero: 456,
      ano: 2024,
      ementa: "Emenda constitucional",
      dataApresentacao: new Date("2024-02-15"),
      camara: "senado",
    };

    const result = ProposicaoSchema.parse(valid);
    expect(result.urlInteiro).toBeUndefined();
    expect(result.autorId).toBeUndefined();
  });

  it("should reject proposicao with missing required fields", () => {
    const invalid = {
      id: "clz4x8h7k0000qz8h8h8h8h8h",
      tipo: "PL",
      numero: 123,
    };

    expect(() => ProposicaoSchema.parse(invalid)).toThrow();
  });

  it("should reject proposicao with invalid URL for urlInteiro", () => {
    const invalid = {
      id: "clz4x8h7k0000qz8h8h8h8h8h",
      externalId: 123456,
      tipo: "PL",
      numero: 123,
      ano: 2024,
      ementa: "Ementa",
      dataApresentacao: new Date(),
      urlInteiro: "not-a-url",
      camara: "camara",
    };

    expect(() => ProposicaoSchema.parse(invalid)).toThrow();
  });

  it("should handle nullable urlInteiro and autorId", () => {
    const valid = {
      id: "clz4x8h7k0000qz8h8h8h8h8h",
      externalId: 123456,
      tipo: "PL",
      numero: 123,
      ano: 2024,
      ementa: "Ementa",
      dataApresentacao: new Date(),
      urlInteiro: null,
      camara: "camara",
      autorId: null,
    };

    const result = ProposicaoSchema.parse(valid);
    expect(result.urlInteiro).toBeNull();
    expect(result.autorId).toBeNull();
  });

  it("should coerce string to date for dataApresentacao field", () => {
    const valid = {
      id: "clz4x8h7k0000qz8h8h8h8h8h",
      externalId: 123456,
      tipo: "PL",
      numero: 123,
      ano: 2024,
      ementa: "Ementa",
      dataApresentacao: "2024-02-15",
      camara: "camara",
    };

    const result = ProposicaoSchema.parse(valid);
    expect(result.dataApresentacao instanceof Date).toBe(true);
  });

  it("should validate different proposal types", () => {
    const types = ["PL", "PEC", "PLP", "PDL"];

    types.forEach((tipo) => {
      const proposicao = {
        id: "clz4x8h7k0000qz8h8h8h8h8h",
        externalId: 123456,
        tipo,
        numero: 123,
        ano: 2024,
        ementa: "Ementa",
        dataApresentacao: new Date(),
        camara: "camara",
      };

      expect(() => ProposicaoSchema.parse(proposicao)).not.toThrow();
    });
  });
});
