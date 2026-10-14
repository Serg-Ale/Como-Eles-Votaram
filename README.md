# Como Eles Votaram

Veja como cada deputado e senador votou, sem precisar abrir o portal do Congresso. O projeto
busca os dados abertos da Câmara dos Deputados e do Senado Federal, guarda tudo num banco próprio
e mostra de forma simples quem votou como, em qual votação e em qual projeto.

## Sobre

Os dados de votação são públicos, mas ficam espalhados em duas APIs com formatos diferentes. Para
saber como uma pessoa votou, você precisa juntar votações, proposições e parlamentares de dois
lugares.

Este projeto faz essa junção uma vez e deixa a consulta rápida. Ele tem uma página para cada
parlamentar, com o histórico de votos e as proposições que a pessoa apresentou, uma página para cada
votação, com o resumo do resultado, e uma busca.

O que guiou as decisões:

- **Uma fonte de dados nossa.** Em vez de consultar as APIs oficiais a cada visita, o app sincroniza
  para o Postgres e responde de lá.
- **Sincronizar sem medo de repetir.** Toda escrita é um `upsert`, então rodar a sincronização duas
  vezes não duplica nada.
- **Tipos do banco até a tela.** Prisma e tRPC mantêm o mesmo formato de ponta a ponta, e uma coluna
  renomeada quebra o `typecheck` antes de quebrar a página.
- **Nada entra no git sem passar pelo portão.** Lint, testes e build rodam antes de cada commit.

## O que faz

| | |
|---|---|
| **Deputados e senadores** | Uma página por parlamentar, com partido, UF, foto e histórico de votos. |
| **Votações** | Uma página por votação, com a descrição, o resultado e o resumo dos votos (Sim, Não, Abstenção, Obstrução, Art. 17 e Não Votou). |
| **Proposições** | Projetos apresentados pelo parlamentar (PL, PEC, PLP e outros), com a ementa e o link para o texto inteiro. |
| **Busca** | Procura parlamentares por nome, com filtro por partido e por UF. |
| **SEO** | Sitemap gerado a partir dos parlamentares, `robots.txt` e imagem Open Graph. |

## Como funciona por dentro

```
Câmara API ─┐
            ├─► orquestrador de sync ─► PostgreSQL ─► tRPC ─► páginas Next.js
Senado API ─┘          ▲
                       │ POST /api/sync (Bearer SYNC_SECRET)
              n8n (a cada 6 horas) ou qualquer cron
```

- **Sincronização.** `POST /api/sync` dispara a carga completa ou de uma fonte e uma entidade
  (`parlamentares`, `votacoes` ou `proposicoes`). A rota exige o cabeçalho
  `Authorization: Bearer <SYNC_SECRET>`.
- **Cuidado com as APIs oficiais.** Os clientes da Câmara e do Senado espaçam as chamadas, e o do
  Senado tenta de novo com espera crescente. As votações do Senado entram em lotes de 100, dentro de
  transações.
- **Observabilidade.** Cada etapa grava uma linha em `SyncLog`, com a fonte, a entidade, o status, a
  quantidade de itens, a duração e o erro, se houve.
- **Agendamento.** O workflow do n8n que chama a rota a cada 6 horas está documentado em
  [`docs/n8n-sync-workflow.md`](docs/n8n-sync-workflow.md).
- **Modelo de dados.** `Parlamentar`, `VoteEvent` (a votação), `VoteRecord` (o voto de uma pessoa em
  uma votação, único por par), `Proposicao` e `SyncLog`, com índices nas colunas de filtro e busca.

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router) e React 19 |
| API | tRPC 11, com SuperJSON e TanStack Query |
| Banco | PostgreSQL 16 e Prisma |
| Validação | Zod, e `@t3-oss/env-nextjs` para as variáveis de ambiente |
| UI | Tailwind CSS 4, Radix e shadcn |
| Testes | Jest e Testing Library |
| Qualidade | ESLint sem avisos, Prettier, Husky, lint-staged e commitlint |

## Rodar localmente

Precisa de Node, pnpm e Docker.

```bash
pnpm install
cp .env.example .env
pnpm db:up        # Postgres 16 na porta 5433
pnpm db:push      # cria as tabelas
pnpm dev
```

No `.env`, aponte o banco para a porta do `docker-compose.yml`:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/como-eles-votaram"
SYNC_SECRET="troque-por-um-segredo"
```

O banco começa vazio. Para popular, chame a sincronização:

```bash
curl -X POST http://localhost:3000/api/sync \
  -H "Authorization: Bearer troque-por-um-segredo" \
  -H "Content-Type: application/json" \
  -d '{"source": "camara", "entity": "parlamentares"}'
```

Sem o campo `entity`, a rota sincroniza tudo da fonte. Sem `source`, sincroniza as duas.

## Scripts

| Comando | O que faz |
|---|---|
| `pnpm dev` | Servidor de desenvolvimento com Turbopack. |
| `pnpm build` e `pnpm start` | Build e servidor de produção. |
| `pnpm test` | Testes com Jest. |
| `pnpm lint` | ESLint, sem tolerar avisos. |
| `pnpm typecheck` | `tsc --noEmit`. |
| `pnpm db:up` e `pnpm db:down` | Sobe e derruba o Postgres do Docker. |
| `pnpm db:push` | Aplica o schema do Prisma sem criar migração. |
| `pnpm db:generate` | Cria uma migração nova em desenvolvimento. |
| `pnpm db:migrate` | Aplica as migrações existentes. |
| `pnpm db:studio` | Abre o Prisma Studio. |

## Qualidade

- O hook `pre-commit` roda `pnpm lint`, `pnpm test` e `pnpm build`.
- O hook `commit-msg` valida a mensagem com commitlint, no padrão de commits convencionais.
- Os testes cobrem os clientes e transformadores de sincronização da Câmara e do Senado, a rota
  `/api/sync`, os routers do tRPC, os schemas e a busca.
