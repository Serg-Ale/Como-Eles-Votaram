import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer = ({ children, className }: PageContainerProps) => {
  return (
    <div className={cn("container mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 max-w-7xl", className)}>
      {children}
    </div>
  );
};
