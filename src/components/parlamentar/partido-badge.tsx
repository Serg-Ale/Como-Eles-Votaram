import { Badge } from "@/components/ui/badge";

interface PartidoBadgeProps {
  partido: string;
  className?: string;
}

export const PartidoBadge = ({ partido, className }: PartidoBadgeProps) => {
  return (
    <Badge 
      variant="secondary" 
      className={`font-semibold text-xs px-2 py-0.5 ${className}`}
    >
      {partido}
    </Badge>
  );
};
