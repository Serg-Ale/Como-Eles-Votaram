import { cn } from "@/lib/utils";
import { FonteBadge } from "@/components/data/fonte-badge";

interface SectionHeaderProps {
  title: string;
  description?: string;
  fonteUrl?: string;
  fonteLabel?: string;
  className?: string;
}

export const SectionHeader = ({ 
  title, 
  description, 
  fonteUrl, 
  fonteLabel,
  className 
}: SectionHeaderProps) => {
  return (
    <div className={cn("flex flex-col gap-2 mb-6", className)}>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-mono text-primary uppercase tracking-widest">
          {`// ${title.toUpperCase()}`}
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">{title}</h2>
          {fonteUrl && <FonteBadge url={fonteUrl} label={fonteLabel} className="self-start sm:self-auto" />}
        </div>
      </div>
      {description && (
        <p className="text-muted-foreground">{description}</p>
      )}
    </div>
  );
};
