import { ParlamentarSchema } from "@/lib/schemas/parlamentar.schema";

describe("ParlamentarSchema", () => {
  it("should validate valid parlamentar data with all fields", () => {
    const valid = {
      id: "dep-204521",
      idOriginal: 204521,
      camara: "camara",
      nome: "João Silva",
      nomeCompleto: "João da Silva Santos",
      partido: "PT",
      uf: "SP",
      foto: "https://example.com/foto.jpg",
      slug: "joao-silva",
      email: "joao@example.com",
      legislatura: 57,
    };

    const result = ParlamentarSchema.parse(valid);
    expect(result.id).toBe("dep-204521");
    expect(result.legislatura).toBe(57);
  });

  it("should validate valid parlamentar data without email", () => {
    const valid = {
      id: "sen-5012",
      idOriginal: 5012,
      camara: "senado",
      nome: "Maria Costa",
      nomeCompleto: "Maria da Costa Silva",
      partido: "PSDB",
      uf: "RJ",
      foto: "https://example.com/maria.jpg",
      slug: "maria-costa",
      legislatura: 57,
    };

    const result = ParlamentarSchema.parse(valid);
    expect(result.email).toBeUndefined();
  });

  it("should reject parlamentar data with missing required fields", () => {
    const invalid = {
      id: "dep-123",
      nome: "João",
    };

    expect(() => ParlamentarSchema.parse(invalid)).toThrow();
  });

  it("should reject parlamentar data with invalid URL for foto", () => {
    const invalidUrl = {
      id: "dep-123",
      idOriginal: 123,
      camara: "camara",
      nome: "Test",
      nomeCompleto: "Test User",
      partido: "PT",
      uf: "SP",
      foto: "not-a-url",
      slug: "test",
      legislatura: 57,
    };

    expect(() => ParlamentarSchema.parse(invalidUrl)).toThrow();
  });

  it("should reject parlamentar data with invalid camara enum", () => {
    const invalidEnum = {
      id: "dep-123",
      idOriginal: 123,
      camara: "invalido",
      nome: "Test",
      nomeCompleto: "Test User",
      partido: "PT",
      uf: "SP",
      foto: "https://example.com/foto.jpg",
      slug: "test",
      legislatura: 57,
    };

    expect(() => ParlamentarSchema.parse(invalidEnum)).toThrow();
  });

  it("should default legislatura to 57 if not provided", () => {
    const valid = {
      id: "dep-999",
      idOriginal: 999,
      camara: "camara",
      nome: "Test",
      nomeCompleto: "Test User",
      partido: "PT",
      uf: "SP",
      foto: "https://example.com/foto.jpg",
      slug: "test",
    };

    const result = ParlamentarSchema.parse(valid);
    expect(result.legislatura).toBe(57);
  });

  it("should handle nullable email field", () => {
    const withNullEmail = {
      id: "dep-111",
      idOriginal: 111,
      camara: "camara",
      nome: "Test",
      nomeCompleto: "Test User",
      partido: "PT",
      uf: "SP",
      foto: "https://example.com/foto.jpg",
      slug: "test",
      email: null,
      legislatura: 57,
    };

    const result = ParlamentarSchema.parse(withNullEmail);
    expect(result.email).toBeNull();
  });
});
