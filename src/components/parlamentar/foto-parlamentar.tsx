"use client";

import { useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface FotoParlamentarProps {
  url: string;
  nome: string;
  size?: number;
  className?: string;
  priority?: boolean;
}

export const FotoParlamentar = ({ 
  url, 
  nome, 
  size = 64, 
  className,
  priority = false 
}: FotoParlamentarProps) => {
  const [error, setError] = useState(false);

  const initials = nome
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (error || !url) {
    return (
      <Avatar className={cn("bg-muted", className)} style={{ width: size, height: size }}>
        <AvatarFallback className="text-muted-foreground font-medium">{initials}</AvatarFallback>
      </Avatar>
    );
  }

  return (
    <div className={cn("relative overflow-hidden rounded-full bg-muted", className)} style={{ width: size, height: size }}>
      <Image
        src={url}
        alt={`Foto de ${nome}`}
        width={size}
        height={size}
        className="object-cover w-full h-full"
        onError={() => setError(true)}
        priority={priority}
      />
    </div>
  );
};
