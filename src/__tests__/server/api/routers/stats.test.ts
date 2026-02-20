/**
 * @jest-environment node
 */
import { db } from "@/server/db";

jest.mock("@/server/db", () => ({
  db: {
    parlamentar: {
      count: jest.fn() as jest.MockedFunction<any>,
    },
    voteEvent: {
      count: jest.fn() as jest.MockedFunction<any>,
    },
    proposicao: {
      count: jest.fn() as jest.MockedFunction<any>,
    },
    syncLog: {
      findFirst: jest.fn() as jest.MockedFunction<any>,
    },
  },
}));

jest.mock("superjson", () => ({ default: {} }));

const mockDb = {
  parlamentar: {
    count: jest.fn() as jest.MockedFunction<any>,
  },
  voteEvent: {
    count: jest.fn() as jest.MockedFunction<any>,
  },
  proposicao: {
    count: jest.fn() as jest.MockedFunction<any>,
  },
  syncLog: {
    findFirst: jest.fn() as jest.MockedFunction<any>,
  },
} as any;

let statsRouter: any;
let createCaller: () => any;

beforeAll(async () => {
  const router = await import("@/server/api/routers/stats");
  statsRouter = router.statsRouter;
  createCaller = () => {
    return statsRouter.createCaller({
      db: mockDb,
      headers: new Headers(),
    });
  };
});

describe("statsRouter", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getCounts", () => {
    it("should return aggregate counts with lastSync when data is present", async () => {
      const lastSyncDate = new Date("2024-02-20T10:30:00Z");

      mockDb.parlamentar.count
        .mockResolvedValueOnce(513) // camara
        .mockResolvedValueOnce(81); // senado

      mockDb.voteEvent.count.mockResolvedValue(1250);
      mockDb.proposicao.count.mockResolvedValue(890);
      mockDb.syncLog.findFirst.mockResolvedValue({
        completedAt: lastSyncDate,
      });

      const caller = createCaller();
      const result = await caller.getCounts();

      expect(result).toEqual({
        totalDeputados: 513,
        totalSenadores: 81,
        totalVotacoes: 1250,
        totalProposicoes: 890,
        lastSync: lastSyncDate,
      });

      expect(mockDb.parlamentar.count).toHaveBeenCalledTimes(2);
      expect(mockDb.parlamentar.count).toHaveBeenNthCalledWith(1, {
        where: { camara: "camara" },
      });
      expect(mockDb.parlamentar.count).toHaveBeenNthCalledWith(2, {
        where: { camara: "senado" },
      });

      expect(mockDb.voteEvent.count).toHaveBeenCalledWith();
      expect(mockDb.proposicao.count).toHaveBeenCalledWith();

      expect(mockDb.syncLog.findFirst).toHaveBeenCalledWith({
        where: { status: "completed" },
        orderBy: { completedAt: "desc" },
        select: { completedAt: true },
      });
    });

    it("should return null lastSync when no completed syncs exist", async () => {
      mockDb.parlamentar.count
        .mockResolvedValueOnce(513) // camara
        .mockResolvedValueOnce(81); // senado

      mockDb.voteEvent.count.mockResolvedValue(1250);
      mockDb.proposicao.count.mockResolvedValue(890);
      mockDb.syncLog.findFirst.mockResolvedValue(null);

      const caller = createCaller();
      const result = await caller.getCounts();

      expect(result).toEqual({
        totalDeputados: 513,
        totalSenadores: 81,
        totalVotacoes: 1250,
        totalProposicoes: 890,
        lastSync: null,
      });

      expect(mockDb.syncLog.findFirst).toHaveBeenCalledWith({
        where: { status: "completed" },
        orderBy: { completedAt: "desc" },
        select: { completedAt: true },
      });
    });

    it("should return all counts as zero with null lastSync when database is empty", async () => {
      mockDb.parlamentar.count
        .mockResolvedValueOnce(0) // camara
        .mockResolvedValueOnce(0); // senado

      mockDb.voteEvent.count.mockResolvedValue(0);
      mockDb.proposicao.count.mockResolvedValue(0);
      mockDb.syncLog.findFirst.mockResolvedValue(null);

      const caller = createCaller();
      const result = await caller.getCounts();

      expect(result).toEqual({
        totalDeputados: 0,
        totalSenadores: 0,
        totalVotacoes: 0,
        totalProposicoes: 0,
        lastSync: null,
      });
    });

    it("should handle partial data gracefully", async () => {
      const lastSyncDate = new Date("2024-02-19T15:45:30Z");

      mockDb.parlamentar.count
        .mockResolvedValueOnce(100) // camara (lower count)
        .mockResolvedValueOnce(27); // senado

      mockDb.voteEvent.count.mockResolvedValue(0); // no votes yet
      mockDb.proposicao.count.mockResolvedValue(150);
      mockDb.syncLog.findFirst.mockResolvedValue({
        completedAt: lastSyncDate,
      });

      const caller = createCaller();
      const result = await caller.getCounts();

      expect(result).toEqual({
        totalDeputados: 100,
        totalSenadores: 27,
        totalVotacoes: 0,
        totalProposicoes: 150,
        lastSync: lastSyncDate,
      });
    });
  });
});
