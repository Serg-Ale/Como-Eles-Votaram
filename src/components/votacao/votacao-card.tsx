import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface VotacaoCardProps {
  votacao: {
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
  };
  className?: string;
}

export const VotacaoCard = ({ votacao, className }: VotacaoCardProps) => {
  const date = new Date(votacao.data);
  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

  const hasProposicao = !!votacao.proposicao;

  return (
    <Card className={cn("bg-card border-border hover:bg-card/80 transition-colors", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <time dateTime={date.toISOString()}>{formattedDate}</time>
          </div>
          {votacao.resultado && (
            <Badge variant="outline" className="shrink-0 bg-background/50">
              {votacao.resultado}
            </Badge>
          )}
        </div>
        <CardTitle className="text-base md:text-lg font-semibold leading-snug mt-2 line-clamp-2 text-foreground" title={votacao.descricao}>
          {votacao.descricao}
        </CardTitle>
      </CardHeader>
      
      {hasProposicao && votacao.proposicao && (
        <CardContent>
          <div className="rounded-md bg-muted/40 p-3 border border-border/50 text-sm">
            <div className="flex items-center gap-2 font-medium text-foreground mb-1">
              <FileText className="h-4 w-4 text-primary" />
              <span>{votacao.proposicao.tipo} {votacao.proposicao.numero}/{votacao.proposicao.ano}</span>
            </div>
            <p className="text-muted-foreground line-clamp-2" title={votacao.proposicao.ementa}>
              {votacao.proposicao.ementa}
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
