import { notFound } from "next/navigation";
import Link from "next/link";
import { api } from "@/trpc/server";

import { StatCard } from "@/components/data/stat-card";
import { DataTable } from "@/components/data/data-table";
import { VotoBadge } from "@/components/votacao/voto-badge";
import { FonteBadge } from "@/components/data/fonte-badge";
import { EmptyState } from "@/components/data/empty-state";
import { UltimaAtualizacao } from "@/components/data/ultima-atualizacao";

import { formatDate } from "@/lib/search/format";
import { buildProfileUrl } from "@/lib/search/slug";
import type { VoteType } from "@/lib/schemas/votacao.schema";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function VotacaoPage({ params }: PageProps) {
  const { id } = await params;

  try {
    const votacao = await api.votacao.getById({ id });

    if (!votacao) {
      notFound();
    }

    const voteSummary = await api.votacao.getVoteSummary({ votacaoId: id });

    // Transform summary for display
    const summaryData = [
      { label: "Sim", value: voteSummary["Sim"] || 0 },
      { label: "Não", value: voteSummary["Não"] || 0 },
      { label: "Abstenção", value: voteSummary["Abstenção"] || 0 },
      { label: "Obstrução", value: voteSummary["Obstrução"] || 0 },
      { label: "Art. 17", value: voteSummary["Art. 17"] || 0 },
      { label: "Não Votou", value: voteSummary["Não Votou"] || 0 },
    ];

    // Flatten data for table to support sorting
    const tableData = votacao.votos.map((v) => ({
      id: v.id,
      parlamentarName: v.parlamentar.nome,
      parlamentarId: v.parlamentar.id,
      parlamentarCamara: v.parlamentar.camara,
      partido: v.parlamentar.partido,
      uf: v.parlamentar.uf,
      voto: v.voto as VoteType,
    }));

    const columns = [
      {
        key: "parlamentarName" as const,
        label: "Parlamentar",
        sortable: true,
        render: (row: typeof tableData[0]) => (
          <Link
            href={buildProfileUrl({
              id: row.parlamentarId,
              nome: row.parlamentarName,
              camara: row.parlamentarCamara,
            })}
            className="font-medium hover:underline"
          >
            {row.parlamentarName}
          </Link>
        ),
      },
      {
        key: "partido" as const,
        label: "Partido",
        sortable: true,
      },
      {
        key: "uf" as const,
        label: "UF",
        sortable: true,
      },
      {
        key: "voto" as const,
        label: "Voto",
        sortable: true,
        render: (row: typeof tableData[0]) => <VotoBadge voto={row.voto} />,
      },
    ];

    return (
      <div className="container mx-auto py-8 px-4 space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                {formatDate(votacao.data)}
              </p>
              <h1 className="text-3xl font-bold tracking-tight mb-2">
                {votacao.descricao}
              </h1>
              <p className="text-xl font-medium">
                Resultado: <span className="text-foreground">{votacao.resultado}</span>
              </p>
            </div>
            <FonteBadge 
              url={votacao.camara === "camara" ? "https://dadosabertos.camara.leg.br/" : "https://www12.senado.leg.br/dados-abertos"}
              label={votacao.camara === "camara" ? "Câmara dos Deputados" : "Senado Federal"}
            />
          </div>

          {votacao.proposicao && (
            <div className="bg-muted/50 p-4 rounded-lg border space-y-2">
              <h2 className="font-semibold text-lg">
                {votacao.proposicao.tipo} {votacao.proposicao.numero}/{votacao.proposicao.ano}
              </h2>
              <p className="text-muted-foreground">{votacao.proposicao.ementa}</p>
              {votacao.proposicao.urlInteiro && (
                <a
                  href={votacao.proposicao.urlInteiro}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm inline-flex items-center"
                >
                  Ver texto integral na fonte oficial →
                </a>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {summaryData.map((stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
            />
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Votos Individuais</h2>
            <UltimaAtualizacao date={votacao.updatedAt} />
          </div>

          {tableData.length > 0 ? (
            <DataTable
              columns={columns}
              data={tableData}
            />
          ) : (
            <EmptyState
              title="Sem registros"
              description="Votação sem registro individual de votos — votações simbólicas ou em comissão podem não ter registro nominal."
            />
          )}
        </div>
      </div>
    );
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_NOT_FOUND") {
      notFound();
    }
    // Handle other errors or let them bubble up to global-error
    console.error("Error fetching votacao:", error);
    notFound(); // Fallback to 404 for simplicity if fetch fails
  }
}
