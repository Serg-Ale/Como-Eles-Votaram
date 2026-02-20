import { z } from "zod";

export const CamaraWrapperSchema = z.object({
  dados: z.array(z.unknown()),
  links: z
    .array(
      z.object({
        rel: z.string(),
        href: z.string(),
      })
    )
    .optional(),
});

export const CamaraDeputadoRawSchema = z.object({
  id: z.number().int(),
  uri: z.string(),
  nome: z.string(),
  siglaPartido: z.string(),
  uriPartido: z.string(),
  siglaUf: z.string(),
  idLegislatura: z.number().int(),
  urlFoto: z.string(),
  email: z.string().optional(),
});

export const CamaraDeputadoDetailRawSchema = CamaraDeputadoRawSchema.extend({
  cpf: z.string(),
  sexo: z.string(),
  urlWebsite: z.string().optional().nullable(),
  redeSocial: z.array(z.string()).optional(),
  dataNascimento: z.string(),
  dataFalecimento: z.string().optional().nullable(),
  ufNascimento: z.string(),
  municipioNascimento: z.string(),
  escolaridade: z.string(),
  ultimoStatus: z.object({
    id: z.number().int(),
    uri: z.string(),
    nome: z.string(),
    siglaPartido: z.string(),
    uriPartido: z.string(),
    siglaUf: z.string(),
    idLegislatura: z.number().int(),
    urlFoto: z.string(),
    data: z.string(),
    nomeEleitoral: z.string(),
    gabinete: z.object({
      nome: z.string(),
      predio: z.string(),
      sala: z.string(),
      andar: z.string(),
      telefone: z.string(),
      email: z.string(),
    }),
    situacao: z.string(),
    condicaoEleitoral: z.string(),
    descricaoStatus: z.string().optional().nullable(),
  }),
});

export const CamaraVotacaoRawSchema = z.object({
  id: z.string(),
  uri: z.string(),
  data: z.string(),
  dataHoraRegistro: z.string(),
  siglaOrgao: z.string(),
  uriOrgao: z.string().optional(),
  uriEvento: z.string().optional(),
  proposicaoObjeto: z.string().optional().nullable(),
  uriProposicaoObjeto: z.string().optional().nullable(),
  descricao: z.string(),
  aprovacao: z.number(),
  placarSim: z.number().optional(),
  placarNao: z.number().optional(),
  placarAbstencao: z.number().optional(),
});

export const CamaraVotoRawSchema = z.object({
  tipoVoto: z.string(),
  deputado_: z.object({
    id: z.number().int(),
    uri: z.string(),
    nome: z.string(),
    siglaPartido: z.string(),
    uriPartido: z.string(),
    siglaUf: z.string(),
    idLegislatura: z.number().int(),
    urlFoto: z.string(),
  }),
});

export const CamaraProposicaoRawSchema = z.object({
  id: z.number().int(),
  uri: z.string(),
  siglaTipo: z.string(),
  codTipo: z.number().int(),
  numero: z.number().int(),
  ano: z.number().int(),
  ementa: z.string(),
  dataApresentacao: z.string(),
  uriOrgaoNumerador: z.string().optional(),
  statusProposicao: z
    .object({
      dataHora: z.string(),
      sequencia: z.number().int(),
      siglaOrgao: z.string(),
      uriOrgao: z.string().optional(),
      regime: z.string().optional(),
      descricaoTramitacao: z.string(),
      codTipoTramitacao: z.string().optional(),
      descricaoSituacao: z.string(),
      codSituacao: z.number().int().optional(),
      despacho: z.string().optional().nullable(),
      url: z.string().optional().nullable(),
      ambito: z.string().optional(),
    })
    .optional(),
  uriAutores: z.string().optional(),
  descricaoTipo: z.string(),
  ementaDetalhada: z.string().optional().nullable(),
  keywords: z.string().optional(),
  uriPropPrincipal: z.string().optional().nullable(),
  uriPropAnterior: z.string().optional().nullable(),
  uriPropPosterior: z.string().optional().nullable(),
  urlInteiroTeor: z.string().optional().nullable(),
  urnFinal: z.string().optional().nullable(),
  texto: z.string().optional().nullable(),
  justificativa: z.string().optional().nullable(),
});

export type CamaraWrapper = z.infer<typeof CamaraWrapperSchema>;
export type CamaraDeputadoRaw = z.infer<typeof CamaraDeputadoRawSchema>;
export type CamaraDeputadoDetailRaw = z.infer<typeof CamaraDeputadoDetailRawSchema>;
export type CamaraVotacaoRaw = z.infer<typeof CamaraVotacaoRawSchema>;
export type CamaraVotoRaw = z.infer<typeof CamaraVotoRawSchema>;
export type CamaraProposicaoRaw = z.infer<typeof CamaraProposicaoRawSchema>;
