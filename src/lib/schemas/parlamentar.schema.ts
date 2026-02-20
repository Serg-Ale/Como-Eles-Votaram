import { z } from "zod";

export const ParlamentarSchema = z.object({
  id: z.string(), // "dep-{id}" or "sen-{id}"
  idOriginal: z.number().int(),
  camara: z.enum(["camara", "senado"]),
  nome: z.string().min(1),
  nomeCompleto: z.string().min(1),
  partido: z.string().min(1),
  uf: z.string().length(2).toUpperCase(),
  foto: z.string().url(),
  slug: z.string().min(1),
  email: z.string().email().optional().nullable(),
  legislatura: z.number().int().default(57),
});

export type Parlamentar = z.infer<typeof ParlamentarSchema>;
