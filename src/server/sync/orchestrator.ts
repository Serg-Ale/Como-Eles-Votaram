import { db } from "@/server/db";

import { syncDeputados, syncProposicoesByDeputado, syncVotacoes } from "./camara";
import {
  syncProposicoesSenado,
  syncSenadores,
  syncVotacoesSenado,
} from "./senado";

export interface SyncReport {
  success: boolean;
  synced: {
    parlamentares: number;
    votacoes: number;
    votos: number;
    proposicoes: number;
  };
  errors: string[];
  duration: number;
}

export const runFullSync = async (): Promise<SyncReport> => {
  const startTime = Date.now();
  const report = {
    parlamentares: 0,
    votacoes: 0,
    votos: 0,
    proposicoes: 0,
    errors: [] as string[],
  };

  const syncLog = await db.syncLog.create({
    data: {
      source: "all",
      entity: "all",
      status: "started",
    },
  });

  try {
    try {
      const depResult = await syncDeputados();
      report.parlamentares += depResult.synced;
      report.errors.push(...depResult.errors);
    } catch (error) {
      report.errors.push(
        `Failed to sync deputados: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }

    try {
      const senResult = await syncSenadores();
      report.parlamentares += senResult.synced;
      report.errors.push(...senResult.errors);
    } catch (error) {
      report.errors.push(
        `Failed to sync senadores: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }

    try {
      const today = new Date();
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(today.getDate() - 30);

      const dataInicio = thirtyDaysAgo.toISOString().split("T")[0];
      const dataFim = today.toISOString().split("T")[0];

      const votCamResult = await syncVotacoes(dataInicio!, dataFim!);
      report.votacoes += votCamResult.votacoes;
      report.votos += votCamResult.votos;
      report.errors.push(...votCamResult.errors);
    } catch (error) {
      report.errors.push(
        `Failed to sync votacoes camara: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }

    try {
      const votSenResult = await syncVotacoesSenado();
      report.votacoes += votSenResult.votacoes;
      report.votos += votSenResult.votos;
      report.errors.push(...votSenResult.errors);
    } catch (error) {
      report.errors.push(
        `Failed to sync votacoes senado: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }

    try {
      const parlamentares = await db.parlamentar.findMany({
        select: { id: true, idOriginal: true, camara: true },
      });

      for (const parlamentar of parlamentares) {
        try {
          if (parlamentar.camara === "camara") {
            const propResult = await syncProposicoesByDeputado(
              parlamentar.idOriginal
            );
            report.proposicoes += propResult.synced;
            report.errors.push(...propResult.errors);
          } else if (parlamentar.camara === "senado") {
            const propResult = await syncProposicoesSenado(
              parlamentar.idOriginal
            );
            report.proposicoes += propResult.synced;
            report.errors.push(...propResult.errors);
          }
        } catch (error) {
          report.errors.push(
            `Failed to sync proposicoes for ${parlamentar.id}: ${error instanceof Error ? error.message : "Unknown error"}`
          );
        }
      }
    } catch (error) {
      report.errors.push(
        `Failed to sync proposicoes: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }

    const status = report.errors.length === 0 ? "completed" : "partial";
    const duration = Date.now() - startTime;

    await db.syncLog.update({
      where: { id: syncLog.id },
      data: {
        status,
        error: report.errors.length > 0 ? report.errors.join("; ") : null,
      },
    });

    return {
      success: status === "completed",
      synced: report,
      errors: report.errors,
      duration,
    };
  } catch (error) {
    await db.syncLog.update({
      where: { id: syncLog.id },
      data: {
        status: "failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
    });

    throw error;
  }
};

export const runPartialSync = async (
  source: "camara" | "senado",
  entity?: "parlamentares" | "votacoes" | "proposicoes"
): Promise<SyncReport> => {
  const startTime = Date.now();
  const report = {
    parlamentares: 0,
    votacoes: 0,
    votos: 0,
    proposicoes: 0,
    errors: [] as string[],
  };

  const syncLog = await db.syncLog.create({
    data: {
      source,
      entity: entity ?? "all",
      status: "started",
    },
  });

  try {
    if (source === "camara") {
      if (!entity || entity === "parlamentares") {
        const depResult = await syncDeputados();
        report.parlamentares += depResult.synced;
        report.errors.push(...depResult.errors);
      }

      if (!entity || entity === "votacoes") {
        const today = new Date();
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);

        const dataInicio = thirtyDaysAgo.toISOString().split("T")[0];
        const dataFim = today.toISOString().split("T")[0];

        const votResult = await syncVotacoes(dataInicio!, dataFim!);
        report.votacoes += votResult.votacoes;
        report.votos += votResult.votos;
        report.errors.push(...votResult.errors);
      }

      if (!entity || entity === "proposicoes") {
        const deputados = await db.parlamentar.findMany({
          where: { camara: "camara" },
          select: { idOriginal: true },
        });

        for (const deputado of deputados) {
          const propResult = await syncProposicoesByDeputado(
            deputado.idOriginal
          );
          report.proposicoes += propResult.synced;
          report.errors.push(...propResult.errors);
        }
      }
    } else if (source === "senado") {
      if (!entity || entity === "parlamentares") {
        const senResult = await syncSenadores();
        report.parlamentares += senResult.synced;
        report.errors.push(...senResult.errors);
      }

      if (!entity || entity === "votacoes") {
        const votResult = await syncVotacoesSenado();
        report.votacoes += votResult.votacoes;
        report.votos += votResult.votos;
        report.errors.push(...votResult.errors);
      }

      if (!entity || entity === "proposicoes") {
        const senadores = await db.parlamentar.findMany({
          where: { camara: "senado" },
          select: { idOriginal: true },
        });

        for (const senador of senadores) {
          const propResult = await syncProposicoesSenado(senador.idOriginal);
          report.proposicoes += propResult.synced;
          report.errors.push(...propResult.errors);
        }
      }
    }

    const status = report.errors.length === 0 ? "completed" : "partial";
    const duration = Date.now() - startTime;

    await db.syncLog.update({
      where: { id: syncLog.id },
      data: {
        status,
        error: report.errors.length > 0 ? report.errors.join("; ") : null,
      },
    });

    return {
      success: status === "completed",
      synced: report,
      errors: report.errors,
      duration,
    };
  } catch (error) {
    await db.syncLog.update({
      where: { id: syncLog.id },
      data: {
        status: "failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
    });

    throw error;
  }
};
