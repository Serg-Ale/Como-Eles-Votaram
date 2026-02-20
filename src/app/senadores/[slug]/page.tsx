import { notFound } from "next/navigation";
import { api } from "@/trpc/server";
import { parseSlug } from "@/lib/search/slug";
import { ParlamentarHeader } from "@/components/parlamentar/parlamentar-header";
import { StatCard } from "@/components/data/stat-card";
import { VotingHistory } from "@/components/parlamentar/voting-history";
import { DataTable } from "@/components/data/data-table";
import { FonteBadge } from "@/components/data/fonte-badge";
import { UltimaAtualizacao } from "@/components/data/ultima-atualizacao";
import { EmptyState } from "@/components/data/empty-state";
import { Vote, FileText } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function SenadorPage({ params }: PageProps) {
  const { slug } = await params;
  const { id } = parseSlug(slug);

  if (!id) {
    notFound();
  }

  const parlamentar = await api.parlamentar.getById({ id });

  if (!parlamentar) {
    notFound();
  }

  // Check if it is a Senador (camara === "senado")
  if (parlamentar.camara !== "senado") {
    notFound();
  }

  const voteCount = parlamentar._count?.votos ?? 0;
  const proposicaoCount = parlamentar._count?.proposicoes ?? 0;

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <div className="space-y-2">
        <ParlamentarHeader parlamentar={parlamentar} />
        <div className="flex justify-between items-center px-1">
          <UltimaAtualizacao date={parlamentar.updatedAt} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard
          label="Votações participadas"
          value={voteCount}
          icon={Vote}
          description="Total de votações nominais registradas"
        />
        <StatCard
          label="Proposições apresentadas"
          value={proposicaoCount}
          icon={FileText}
          description="Autoria ou co-autoria de projetos"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Vote className="h-5 w-5" />
              Histórico de Votações
            </h2>
            <FonteBadge url="https://www12.senado.leg.br/dados-abertos" label="Dados Abertos do Senado Federal" />
          </div>
          
          {parlamentar.votos.length > 0 ? (
            <VotingHistory 
              parlamentarId={parlamentar.id} 
              initialVotes={parlamentar.votos} 
            />
          ) : (
            <EmptyState 
              title="Sem dados disponíveis" 
              description="Nenhum registro de votação encontrado para este parlamentar." 
            />
          )}
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Proposições
            </h2>
            <FonteBadge url="https://www12.senado.leg.br/dados-abertos" label="Dados Abertos do Senado Federal" />
          </div>

          {parlamentar.proposicoes.length > 0 ? (
            <DataTable
              columns={[
                { key: "tipo", label: "Tipo", sortable: true },
                { key: "numero", label: "Número", sortable: true },
                { key: "ano", label: "Ano", sortable: true },
                { key: "ementa", label: "Ementa", render: (p: any) => (
                  <span className="line-clamp-2" title={p.ementa}>{p.ementa}</span>
                )},
              ]}
              data={parlamentar.proposicoes}
              className="bg-card"
            />
          ) : (
            <EmptyState 
              title="Sem dados disponíveis" 
              description="Nenhuma proposição encontrada para este parlamentar." 
            />
          )}
        </section>
      </div>
    </div>
  );
}
