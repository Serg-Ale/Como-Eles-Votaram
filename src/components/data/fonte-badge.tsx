import { Badge } from "@/components/ui/badge";
import { Link2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface FonteBadgeProps {
  url: string;
  label?: string;
  className?: string;
}

export const FonteBadge = ({ url, label = "Fonte oficial", className }: FonteBadgeProps) => {
  return (
    <Link href={url} target="_blank" rel="noopener noreferrer" className="inline-flex">
      <Badge variant="outline" className={cn("gap-1 hover:bg-muted cursor-pointer text-xs font-normal text-muted-foreground transition-colors", className)}>
        <Link2 className="h-3 w-3" />
        {label}
      </Badge>
    </Link>
  );
};
