import { Badge } from "@/components/ui/badge";
import { Building2, Landmark } from "lucide-react";

interface CamaraIndicatorProps {
  camara: string;
  className?: string;
}

export const CamaraIndicator = ({ camara, className }: CamaraIndicatorProps) => {
  const isCamara = camara.toLowerCase() === "camara";
  const label = isCamara ? "Câmara" : "Senado";
  const Icon = isCamara ? Landmark : Building2;

  return (
    <Badge 
      variant="outline" 
      className={`gap-1.5 font-normal text-muted-foreground ${className}`}
    >
      <Icon className="h-3 w-3" />
      {label}
    </Badge>
  );
};
