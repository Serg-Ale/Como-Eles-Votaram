import { formatDate, formatDateRelative, formatVoteType } from "../format";

describe("Format utilities", () => {
  describe("formatDate", () => {
    it("should format date in dd/MM/yyyy format", () => {
      const result = formatDate("2024-06-15");

      expect(result).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    });

    it("should handle string date input", () => {
      const result = formatDate("2024-06-15");

      expect(result).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    });

    it("should handle Date object input", () => {
      const date = new Date("2024-06-15T12:00:00Z");
      const result = formatDate(date);

      expect(result).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    });

    it("should use pt-BR locale", () => {
      const result = formatDate("2024-06-15");

      const parts = result.split("/");
      expect(parts).toHaveLength(3);
      expect(parts[2]).toMatch(/^\d{4}$/);
    });
  });

  describe("formatDateRelative", () => {
    it("should format recent dates as relative", () => {
      const now = new Date();
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

      const result = formatDateRelative(oneHourAgo);

      // Should contain Portuguese text like "há"
      expect(result.toLowerCase()).toContain("há");
    });

    it("should format old dates as relative", () => {
      const now = new Date();
      const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);

      const result = formatDateRelative(threeDaysAgo);

      expect(result.toLowerCase()).toContain("há");
    });

    it("should use pt-BR locale", () => {
      const now = new Date();
      const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);

      const result = formatDateRelative(twoHoursAgo);

      // pt-BR uses "há" for "ago"
      expect(result.toLowerCase()).toContain("há");
      // Should not contain English words
      expect(result).not.toContain("ago");
      expect(result).not.toContain("hour");
      expect(result).not.toContain("day");
    });

    it("should handle string dates", () => {
      const now = new Date();
      const pastTime = new Date(now.getTime() - 5 * 60 * 1000).toISOString();

      const result = formatDateRelative(pastTime);

      expect(result.toLowerCase()).toContain("há");
    });

    it("should format minutes ago", () => {
      const now = new Date();
      const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

      const result = formatDateRelative(fiveMinutesAgo);

      expect(result.toLowerCase()).toContain("há");
    });

    it("should format hours ago", () => {
      const now = new Date();
      const threeHoursAgo = new Date(now.getTime() - 3 * 60 * 60 * 1000);

      const result = formatDateRelative(threeHoursAgo);

      expect(result.toLowerCase()).toContain("há");
    });

    it("should format days ago", () => {
      const now = new Date();
      const tenDaysAgo = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000);

      const result = formatDateRelative(tenDaysAgo);

      expect(result.toLowerCase()).toContain("há");
    });
  });

  describe("formatVoteType", () => {
    it("should return Sim label unchanged", () => {
      const result = formatVoteType("Sim");

      expect(result).toBe("Sim");
    });

    it("should return Não label unchanged", () => {
      const result = formatVoteType("Não");

      expect(result).toBe("Não");
    });

    it("should return Abstenção label unchanged", () => {
      const result = formatVoteType("Abstenção");

      expect(result).toBe("Abstenção");
    });

    it("should return Obstrução label unchanged", () => {
      const result = formatVoteType("Obstrução");

      expect(result).toBe("Obstrução");
    });

    it("should return Art. 17 label unchanged", () => {
      const result = formatVoteType("Art. 17");

      expect(result).toBe("Art. 17");
    });

    it("should return Não Votou label unchanged", () => {
      const result = formatVoteType("Não Votou");

      expect(result).toBe("Não Votou");
    });

    it("should handle all vote types", () => {
      const voteTypes = [
        "Sim",
        "Não",
        "Abstenção",
        "Obstrução",
        "Art. 17",
        "Não Votou",
      ];

      voteTypes.forEach((type) => {
        const result = formatVoteType(type as any);

        expect(result).toBe(type);
      });
    });
  });
});
