/**
 * @jest-environment node
 */
import { db } from "@/server/db";
import { runFullSync, runPartialSync } from "@/server/sync/orchestrator";

import {
  syncDeputados,
  syncProposicoesByDeputado,
  syncVotacoes,
} from "@/server/sync/camara";
import {
  syncProposicoesSenado,
  syncSenadores,
  syncVotacoesSenado,
} from "@/server/sync/senado";

jest.mock("@/server/db", () => ({
  db: {
    syncLog: {
      create: jest.fn(),
      update: jest.fn(),
    },
    parlamentar: {
      findMany: jest.fn(),
    },
  },
}));

jest.mock("@/server/sync/camara", () => ({
  syncDeputados: jest.fn(),
  syncVotacoes: jest.fn(),
  syncProposicoesByDeputado: jest.fn(),
}));

jest.mock("@/server/sync/senado", () => ({
  syncSenadores: jest.fn(),
  syncVotacoesSenado: jest.fn(),
  syncProposicoesSenado: jest.fn(),
}));

describe("runFullSync", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (db.syncLog.create as jest.Mock).mockResolvedValue({ id: "sync-log-1" });
    (db.syncLog.update as jest.Mock).mockResolvedValue({});
    (db.parlamentar.findMany as jest.Mock).mockResolvedValue([]);
  });

  it("runs all sync steps in sequence", async () => {
    (syncDeputados as jest.Mock).mockResolvedValue({ synced: 10, errors: [] });
    (syncSenadores as jest.Mock).mockResolvedValue({ synced: 15, errors: [] });
    (syncVotacoes as jest.Mock).mockResolvedValue({
      votacoes: 5,
      votos: 100,
      errors: [],
    });
    (syncVotacoesSenado as jest.Mock).mockResolvedValue({
      votacoes: 8,
      votos: 150,
      errors: [],
    });

    const result = await runFullSync();

    expect(syncDeputados).toHaveBeenCalled();
    expect(syncSenadores).toHaveBeenCalled();
    expect(syncVotacoes).toHaveBeenCalled();
    expect(syncVotacoesSenado).toHaveBeenCalled();

    expect(result.synced.parlamentares).toBe(25);
    expect(result.synced.votacoes).toBe(13);
    expect(result.synced.votos).toBe(250);
    expect(result.success).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it("continues on error and marks as partial", async () => {
    (syncDeputados as jest.Mock).mockResolvedValue({
      synced: 0,
      errors: ["API down"],
    });
    (syncSenadores as jest.Mock).mockResolvedValue({
      synced: 15,
      errors: [],
    });
    (syncVotacoes as jest.Mock).mockResolvedValue({
      votacoes: 0,
      votos: 0,
      errors: ["Timeout"],
    });
    (syncVotacoesSenado as jest.Mock).mockResolvedValue({
      votacoes: 8,
      votos: 150,
      errors: [],
    });

    const result = await runFullSync();

    expect(result.success).toBe(false);
    expect(result.synced.parlamentares).toBe(15);
    expect(result.synced.votacoes).toBe(8);
    expect(result.errors).toContain("API down");
    expect(result.errors).toContain("Timeout");

    expect(db.syncLog.update).toHaveBeenCalledWith({
      where: { id: "sync-log-1" },
      data: {
        status: "partial",
        error: "API down; Timeout",
      },
    });
  });

  it("marks sync as completed when no errors occur", async () => {
    (syncDeputados as jest.Mock).mockResolvedValue({ synced: 10, errors: [] });
    (syncSenadores as jest.Mock).mockResolvedValue({ synced: 15, errors: [] });
    (syncVotacoes as jest.Mock).mockResolvedValue({
      votacoes: 5,
      votos: 100,
      errors: [],
    });
    (syncVotacoesSenado as jest.Mock).mockResolvedValue({
      votacoes: 8,
      votos: 150,
      errors: [],
    });

    await runFullSync();

    expect(db.syncLog.update).toHaveBeenCalledWith({
      where: { id: "sync-log-1" },
      data: {
        status: "completed",
        error: null,
      },
    });
  });

  it("syncs proposicoes for all parlamentares", async () => {
    (syncDeputados as jest.Mock).mockResolvedValue({ synced: 2, errors: [] });
    (syncSenadores as jest.Mock).mockResolvedValue({ synced: 2, errors: [] });
    (syncVotacoes as jest.Mock).mockResolvedValue({
      votacoes: 0,
      votos: 0,
      errors: [],
    });
    (syncVotacoesSenado as jest.Mock).mockResolvedValue({
      votacoes: 0,
      votos: 0,
      errors: [],
    });

    (db.parlamentar.findMany as jest.Mock).mockResolvedValue([
      { id: "dep-123", idOriginal: 123, camara: "camara" },
      { id: "sen-456", idOriginal: 456, camara: "senado" },
    ]);

    (syncProposicoesByDeputado as jest.Mock).mockResolvedValue({
      synced: 5,
      errors: [],
    });
    (syncProposicoesSenado as jest.Mock).mockResolvedValue({
      synced: 3,
      errors: [],
    });

    const result = await runFullSync();

    expect(syncProposicoesByDeputado).toHaveBeenCalledWith(123);
    expect(syncProposicoesSenado).toHaveBeenCalledWith(456);
    expect(result.synced.proposicoes).toBe(8);
  });

  it("creates SyncLog at start and updates on completion", async () => {
    (syncDeputados as jest.Mock).mockResolvedValue({ synced: 0, errors: [] });
    (syncSenadores as jest.Mock).mockResolvedValue({ synced: 0, errors: [] });
    (syncVotacoes as jest.Mock).mockResolvedValue({
      votacoes: 0,
      votos: 0,
      errors: [],
    });
    (syncVotacoesSenado as jest.Mock).mockResolvedValue({
      votacoes: 0,
      votos: 0,
      errors: [],
    });

    await runFullSync();

    expect(db.syncLog.create).toHaveBeenCalledWith({
      data: {
        source: "all",
        entity: "all",
        status: "started",
      },
    });

    expect(db.syncLog.update).toHaveBeenCalled();
  });

  it("handles fatal error gracefully", async () => {
    (syncDeputados as jest.Mock).mockRejectedValue(new Error("Fatal error"));
    (syncSenadores as jest.Mock).mockResolvedValue({ synced: 0, errors: [] });
    (syncVotacoes as jest.Mock).mockResolvedValue({
      votacoes: 0,
      votos: 0,
      errors: [],
    });
    (syncVotacoesSenado as jest.Mock).mockResolvedValue({
      votacoes: 0,
      votos: 0,
      errors: [],
    });

    const result = await runFullSync();

    expect(result.success).toBe(false);
    expect(result.errors).toContain("Failed to sync deputados: Fatal error");
  });
});

describe("runPartialSync", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (db.syncLog.create as jest.Mock).mockResolvedValue({ id: "sync-log-2" });
    (db.syncLog.update as jest.Mock).mockResolvedValue({});
    (db.parlamentar.findMany as jest.Mock).mockResolvedValue([]);
  });

  it("syncs only camara when source is camara", async () => {
    (syncDeputados as jest.Mock).mockResolvedValue({ synced: 10, errors: [] });
    (syncVotacoes as jest.Mock).mockResolvedValue({
      votacoes: 5,
      votos: 100,
      errors: [],
    });

    const result = await runPartialSync("camara");

    expect(syncDeputados).toHaveBeenCalled();
    expect(syncVotacoes).toHaveBeenCalled();
    expect(syncSenadores).not.toHaveBeenCalled();
    expect(syncVotacoesSenado).not.toHaveBeenCalled();

    expect(result.synced.parlamentares).toBe(10);
    expect(result.synced.votacoes).toBe(5);
  });

  it("syncs only senado when source is senado", async () => {
    (syncSenadores as jest.Mock).mockResolvedValue({ synced: 15, errors: [] });
    (syncVotacoesSenado as jest.Mock).mockResolvedValue({
      votacoes: 8,
      votos: 150,
      errors: [],
    });

    const result = await runPartialSync("senado");

    expect(syncSenadores).toHaveBeenCalled();
    expect(syncVotacoesSenado).toHaveBeenCalled();
    expect(syncDeputados).not.toHaveBeenCalled();
    expect(syncVotacoes).not.toHaveBeenCalled();

    expect(result.synced.parlamentares).toBe(15);
    expect(result.synced.votacoes).toBe(8);
  });

  it("syncs only parlamentares when entity is parlamentares", async () => {
    (syncDeputados as jest.Mock).mockResolvedValue({ synced: 10, errors: [] });

    const result = await runPartialSync("camara", "parlamentares");

    expect(syncDeputados).toHaveBeenCalled();
    expect(syncVotacoes).not.toHaveBeenCalled();
    expect(syncProposicoesByDeputado).not.toHaveBeenCalled();

    expect(result.synced.parlamentares).toBe(10);
    expect(result.synced.votacoes).toBe(0);
    expect(result.synced.proposicoes).toBe(0);
  });

  it("syncs only votacoes when entity is votacoes", async () => {
    (syncVotacoes as jest.Mock).mockResolvedValue({
      votacoes: 5,
      votos: 100,
      errors: [],
    });

    const result = await runPartialSync("camara", "votacoes");

    expect(syncDeputados).not.toHaveBeenCalled();
    expect(syncVotacoes).toHaveBeenCalled();
    expect(syncProposicoesByDeputado).not.toHaveBeenCalled();

    expect(result.synced.votacoes).toBe(5);
    expect(result.synced.votos).toBe(100);
  });

  it("syncs only proposicoes when entity is proposicoes", async () => {
    (db.parlamentar.findMany as jest.Mock).mockResolvedValue([
      { idOriginal: 123 },
      { idOriginal: 456 },
    ]);

    (syncProposicoesByDeputado as jest.Mock).mockResolvedValue({
      synced: 5,
      errors: [],
    });

    const result = await runPartialSync("camara", "proposicoes");

    expect(syncDeputados).not.toHaveBeenCalled();
    expect(syncVotacoes).not.toHaveBeenCalled();
    expect(syncProposicoesByDeputado).toHaveBeenCalledTimes(2);
    expect(syncProposicoesByDeputado).toHaveBeenCalledWith(123);
    expect(syncProposicoesByDeputado).toHaveBeenCalledWith(456);

    expect(result.synced.proposicoes).toBe(10);
  });

  it("creates SyncLog with correct source and entity", async () => {
    (syncSenadores as jest.Mock).mockResolvedValue({ synced: 0, errors: [] });

    await runPartialSync("senado", "parlamentares");

    expect(db.syncLog.create).toHaveBeenCalledWith({
      data: {
        source: "senado",
        entity: "parlamentares",
        status: "started",
      },
    });
  });

  it("marks sync as failed on fatal error", async () => {
    (syncDeputados as jest.Mock).mockRejectedValue(new Error("Fatal error"));

    await expect(
      runPartialSync("camara", "parlamentares")
    ).rejects.toThrow("Fatal error");

    expect(db.syncLog.update).toHaveBeenCalledWith({
      where: { id: "sync-log-2" },
      data: {
        status: "failed",
        error: "Fatal error",
      },
    });
  });
});
