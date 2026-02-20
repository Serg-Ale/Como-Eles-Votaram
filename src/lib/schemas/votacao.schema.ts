import { z } from "zod";

export const VoteTypeEnum = z.enum([
  "Sim",
  "Não",
  "Abstenção",
  "Obstrução",
  "Art. 17",
  "Não Votou",
]);

export const VoteEventSchema = z.object({
  id: z.string().cuid(),
  externalId: z.string().min(1),
  data: z.coerce.date(),
  descricao: z.string().min(1),
  resultado: z.string().optional().nullable(),
  camara: z.enum(["camara", "senado"]),
  proposicaoId: z.string().optional().nullable(),
});

export const VoteRecordSchema = z.object({
  id: z.string().cuid(),
  voto: VoteTypeEnum,
  parlamentarId: z.string(),
  votacaoId: z.string(),
  data: z.coerce.date(),
});

export type VoteType = z.infer<typeof VoteTypeEnum>;
export type VoteEvent = z.infer<typeof VoteEventSchema>;
export type VoteRecord = z.infer<typeof VoteRecordSchema>;
