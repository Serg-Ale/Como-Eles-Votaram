import { CamaraProposicaoRawSchema } from "@/lib/schemas";
import { db } from "@/server/db";

import { fetchAllPages } from "./client";
import { transformProposicao } from "./transformers";

export const syncProposicoesByDeputado = async (deputadoId: number) => {
  const errors: string[] = [];
  const listEndpoint = `/deputados/${deputadoId}/proposicoes`;
  const proposicoes = await fetchAllPages(listEndpoint);
  let synced = 0;
  const autorId = `dep-${deputadoId}`;

  for (const raw of proposicoes) {
    try {
      const parsed = CamaraProposicaoRawSchema.parse(raw);
      const proposicao = transformProposicao(parsed, autorId);
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
        error instanceof Error
          ? error.message
          : "Failed to sync proposicao"
      );
    }
  }

  return { synced, errors };
};
