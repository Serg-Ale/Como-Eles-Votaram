import { VotacaoCard } from "./votacao-card";
import { EmptyState } from "@/components/data/empty-state";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface VotacaoListProps {
  votacoes: Array<{
    id: string;
    data: Date | string;
    descricao: string;
    resultado: string | null;
    proposicao?: {
      id: string;
      tipo: string;
      numero: number;
      ano: number;
      ementa: string;
    } | null;
  }>;
  hasMore?: boolean;
  isLoading?: boolean;
  onLoadMore?: () => void;
  className?: string;
}

export const VotacaoList = ({ 
  votacoes, 
  hasMore = false, 
  isLoading = false, 
  onLoadMore, 
  className 
}: VotacaoListProps) => {
  if (votacoes.length === 0 && !isLoading) {
    return <EmptyState title="Sem votações disponíveis" description="Nenhuma votação encontrada para os critérios selecionados." />;
  }

  return (
    <div className={cn("space-y-6", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {votacoes.map((votacao) => (
          <VotacaoCard key={votacao.id} votacao={votacao} className="h-full" />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-4">
          <Button 
            variant="outline" 
            onClick={onLoadMore} 
            disabled={isLoading}
            className="w-full md:w-auto min-w-[200px]"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Carregando..." : "Carregar mais"}
          </Button>
        </div>
      )}
    </div>
  );
};
