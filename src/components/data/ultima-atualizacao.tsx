import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface UltimaAtualizacaoProps {
  date: Date | string;
  className?: string;
}

export const UltimaAtualizacao = ({ date, className }: UltimaAtualizacaoProps) => {
  const d = new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);
  
  let value = 0;
  let unit: Intl.RelativeTimeFormatUnit = 'second';
  
  if (diffInSeconds < 60) {
    value = -diffInSeconds;
    unit = 'second';
  } else if (diffInSeconds < 3600) {
    value = -Math.floor(diffInSeconds / 60);
    unit = 'minute';
  } else if (diffInSeconds < 86400) {
    value = -Math.floor(diffInSeconds / 3600);
    unit = 'hour';
  } else {
    value = -Math.floor(diffInSeconds / 86400);
    unit = 'day';
  }

  const rtf = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' });
  const relativeTime = rtf.format(value, unit);

  return (
    <div className={cn("flex items-center gap-1.5 text-xs text-muted-foreground", className)}>
      <Clock className="h-3 w-3" />
      <span>Atualizado {relativeTime}</span>
    </div>
  );
};
