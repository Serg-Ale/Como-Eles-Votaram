import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VotoBadge } from "@/components/votacao/voto-badge";
import { Calendar } from "lucide-react";

interface VoteRecord {
  id: string;
  voto: string;
  createdAt: Date;
  votacao: {
    id: string;
    descricao: string;
    data: Date;
  };
}

interface VotingHistoryCardProps {
  vote: VoteRecord;
}

export function VotingHistoryCard({ vote }: VotingHistoryCardProps) {
  return (
    <Card className="bg-card border-border hover:bg-card/80 overflow-hidden transition-all">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium line-clamp-2 leading-tight text-foreground">
            <Link 
              href={`/votacoes/${vote.votacao.id}`}
              className="hover:underline hover:text-primary transition-colors"
            >
              {vote.votacao.descricao}
            </Link>
          </CardTitle>
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="mr-1 h-3 w-3" />
            {format(new Date(vote.votacao.data), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </div>
        </div>
        <div className="pl-4">
          <VotoBadge voto={vote.voto} />
        </div>
      </CardHeader>
    </Card>
  );
}
