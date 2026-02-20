import { z } from "zod";

export const ProposicaoSchema = z.object({
  id: z.string().cuid(),
  externalId: z.number().int(),
  tipo: z.string().min(1),
  numero: z.number().int(),
  ano: z.number().int(),
  ementa: z.string().min(1),
  dataApresentacao: z.coerce.date(),
  urlInteiro: z.string().url().optional().nullable(),
  camara: z.enum(["camara", "senado"]),
  autorId: z.string().optional().nullable(),
});

export type Proposicao = z.infer<typeof ProposicaoSchema>;
