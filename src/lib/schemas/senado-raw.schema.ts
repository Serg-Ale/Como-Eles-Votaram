import { z } from "zod";

export const SenadoSenadorRawSchema = z.object({
  CodigoParlamentar: z.string(),
  IdentificacaoParlamentar: z.object({
    CodigoParlamentar: z.string(),
    NomeParlamentar: z.string(),
    NomeCompletoParlamentar: z.string(),
    SexoParlamentar: z.string(),
    FormaTratamento: z.string(),
    UrlFotoParlamentar: z.string(),
    UrlPaginaParlamentar: z.string(),
    EmailParlamentar: z.string().optional(),
    SiglaPartidoParlamentar: z.string(),
    UfParlamentar: z.string(),
  }),
  DadosBasicosParlamentar: z
    .object({
      DataNascimento: z.string(),
      Naturalidade: z.string().optional(),
      UfNaturalidade: z.string().optional(),
    })
    .optional(),
});

export const SenadoSenadorListRawSchema = z.object({
  ListaParlamentarEmExercicio: z.object({
    Parlamentares: z.object({
      Parlamentar: z.array(SenadoSenadorRawSchema),
    }),
  }),
});

export const SenadoVotacaoRawSchema = z.object({
  CodigoSessao: z.string(),
  SiglaCasa: z.string(),
  NumeroSessao: z.string(),
  TipoSessao: z.string(),
  DataSessao: z.string(),
  HoraInicio: z.string(),
  Votacao: z.object({
    CodigoSessaoVotacao: z.string(),
    IdentificacaoVotacao: z.string(),
    DescricaoVotacao: z.string(),
    Resultado: z.string(),
    Materia: z
      .object({
        IdentificacaoMateria: z.string(),
        SiglaSubtipoMateria: z.string().optional(),
        NumeroMateria: z.string().optional(),
        AnoMateria: z.string().optional(),
        DescricaoIdentificacaoMateria: z.string(),
      })
      .optional(),
  }),
});

export const SenadoVotoRawSchema = z.object({
  CodigoParlamentar: z.string(),
  NomeParlamentar: z.string(),
  SiglaPartido: z.string(),
  SiglaUF: z.string(),
  Voto: z.string(),
});

export type SenadoSenadorRaw = z.infer<typeof SenadoSenadorRawSchema>;
export type SenadoSenadorListRaw = z.infer<typeof SenadoSenadorListRawSchema>;
export type SenadoVotacaoRaw = z.infer<typeof SenadoVotacaoRawSchema>;
export type SenadoVotoRaw = z.infer<typeof SenadoVotoRawSchema>;
