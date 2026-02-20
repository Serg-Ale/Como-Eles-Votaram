import { db } from "@/server/db";

import { fetchSenado } from "./client";
import { transformProposicaoSenado } from "./transformers";

const extractProposicoes = (raw: unknown): unknown[] => {
  if (!raw) {
    return [];
  }

  if (Array.isArray(raw)) {
    return raw;
  }

  if (typeof raw === "object") {
    const value = raw as Record<string, unknown>;
    if (Array.isArray(value.Materias)) {
      return value.Materias;
    }
    if (Array.isArray(value.Materia)) {
      return value.Materia;
    }
    if (value.Materias && typeof value.Materias === "object") {
      const nested = (value.Materias as Record<string, unknown>).Materia;
      if (Array.isArray(nested)) {
        return nested;
      }
    }
  }

  return [];
};

export const syncProposicoesSenado = async (senadorId: number) => {
  const errors: string[] = [];
  const autorId = `sen-${senadorId}`;
  const endpoint = `/senador/${senadorId}/materias.json`;
  const response = await fetchSenado(endpoint);

  if (!response) {
    const message = "Senado API returned null for proposicoes";
    console.warn(message);
    await db.syncLog.create({
      data: {
        source: "senado",
        entity: "proposicoes",
        status: "failed",
        error: message,
      },
    });
    return { synced: 0, errors: [message] };
  }

  let synced = 0;

  const proposicoes = extractProposicoes(response);

  for (const raw of proposicoes) {
    try {
      const proposicao = transformProposicaoSenado(raw, autorId);
      await db.proposicao.upsert({
        where: { externalId: proposicao.externalId },
        create: proposicao,
        update: {
          tipo: proposicao.tipo,
          numero: proposicao.numero,
          ano: proposicao.ano,
          ementa: proposicao.ementa,
          dataApresentacao: proposicao.dataApresentacao,
          urlInteiro: proposicao.urlInteiro,
          camara: proposicao.camara,
        },
      });

      synced += 1;
    } catch (error) {
      errors.push(
        error instanceof Error ? error.message : "Failed to sync proposicao"
      );
    }
  }

  if (synced === 0 && errors.length > 0) {
    const message = "Failed to sync proposicoes";
    console.warn(message);
    await db.syncLog.create({
      data: {
        source: "senado",
        entity: "proposicoes",
        status: "failed",
        error: message,
      },
    });
    return { synced: 0, errors };
  }

  return { synced, errors };
};
