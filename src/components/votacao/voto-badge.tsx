import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type VotoType = "Sim" | "Não" | "Abstenção" | "Obstrução" | "Art. 17" | "Não Votou";

interface VotoBadgeProps {
  voto: string;
  className?: string;
}

export const VotoBadge = ({ voto, className }: VotoBadgeProps) => {
  const getBadgeStyles = (votoType: string) => {
    switch (votoType) {
      case "Sim":
        return "bg-green-500 hover:bg-green-600 border-green-600 text-white";
      case "Não":
        return "bg-red-500 hover:bg-red-600 border-red-600 text-white";
      case "Abstenção":
        return "bg-amber-500 hover:bg-amber-600 border-amber-600 text-white";
      case "Obstrução":
        return "bg-purple-500 hover:bg-purple-600 border-purple-600 text-white";
      case "Art. 17":
        return "bg-slate-500 hover:bg-slate-600 border-slate-600 text-white";
      case "Não Votou":
      default:
        return "bg-muted text-muted-foreground border-border hover:bg-muted/80";
    }
  };

  return (
    <Badge 
      variant="outline" 
      className={cn("font-medium shadow-sm transition-colors", getBadgeStyles(voto), className)}
    >
      {voto}
    </Badge>
  );
};
