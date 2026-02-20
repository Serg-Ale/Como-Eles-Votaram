import { SenadoVotacaoRawSchema, SenadoVotoRawSchema } from "@/lib/schemas";
import { db } from "@/server/db";

import { fetchSenado } from "./client";
import { transformVotacaoSenado, transformVotoSenado } from "./transformers";

const chunk = <T>(items: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
};

const extractVotos = (raw: unknown): unknown[] => {
  if (!raw) {
    return [];
  }

  if (Array.isArray(raw)) {
    return raw;
  }

  if (typeof raw === "object") {
    const value = raw as Record<string, unknown>;
    const votos = value.Votos ?? value.Voto ?? value.ResultadoVotacao;
    if (Array.isArray(votos)) {
      return votos;
    }
    if (typeof votos === "object" && votos !== null) {
      const nested = (votos as Record<string, unknown>).Voto;
      if (Array.isArray(nested)) {
        return nested;
      }
    }
  }

  return [];
};

export const syncVotacoesSenado = async () => {
  const errors: string[] = [];
  const listEndpoint = "/votacao.json";
  const response = await fetchSenado(listEndpoint);

  if (!response) {
    const message = "Senado API returned null for votacoes";
    console.warn(message);
    await db.syncLog.create({
      data: {
        source: "senado",
        entity: "votacoes",
        status: "failed",
        error: message,
      },
    });
    return { votacoes: 0, votos: 0, errors: [message] };
  }

  const payload = Array.isArray(response) ? response : [response];
  let votacoes = 0;
  let votos = 0;

  try {
    for (const raw of payload) {
      try {
        const parsed = SenadoVotacaoRawSchema.parse(raw);
        const eventInput = transformVotacaoSenado(parsed);
        const votosRaw = extractVotos(raw);

        await db.$transaction(async (tx) => {
          const event = await tx.voteEvent.upsert({
            where: { externalId: eventInput.externalId },
            create: eventInput,
            update: {
              data: eventInput.data,
              descricao: eventInput.descricao,
              resultado: eventInput.resultado,
              camara: eventInput.camara,
            },
          });

          votacoes += 1;

          if (votosRaw.length === 0) {
            return;
          }

          const voteInputs = votosRaw.map((voto) => {
            const parsedVoto = SenadoVotoRawSchema.parse(voto);
            return transformVotoSenado(parsedVoto, event.id, event.data);
          });

          const batches = chunk(voteInputs, 100);
          for (const batch of batches) {
            await tx.voteRecord.createMany({
              data: batch,
              skipDuplicates: true,
            });
            votos += batch.length;
          }
        });
      } catch (error) {
        errors.push(
          error instanceof Error ? error.message : "Failed to sync votacao"
        );
      }
    }

    return { votacoes, votos, errors };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to sync votacoes";
    console.warn(message);
    await db.syncLog.create({
      data: {
        source: "senado",
        entity: "votacoes",
        status: "failed",
        error: message,
      },
    });
    return { votacoes: 0, votos: 0, errors: [message] };
  }
};
