import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title?: string;
  description?: string;
  className?: string;
  icon?: React.ElementType;
}

export const EmptyState = ({ 
  title = "Sem dados disponíveis", 
  description, 
  className,
  icon: Icon = Inbox
}: EmptyStateProps) => {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 px-4 text-center border-2 border-border rounded-lg bg-card", className)}>
      <div className="bg-muted p-4 rounded-full mb-4">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground max-w-sm">
          {description}
        </p>
      )}
    </div>
  );
};
