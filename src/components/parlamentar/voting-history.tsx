"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { api } from "@/trpc/react";
import { VotingHistoryCard } from "./voting-history-card";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VotingHistoryProps {
  parlamentarId: string;
  initialVotes: any[];
}

export function VotingHistory({ parlamentarId, initialVotes }: VotingHistoryProps) {
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = api.parlamentar.getVotingHistory.useInfiniteQuery(
    {
      parlamentarId,
      limit: 20,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialData: {
        pages: [
          {
            items: initialVotes,
            nextCursor: initialVotes.length > 0 ? initialVotes[initialVotes.length - 1].id : null,
          },
        ],
        pageParams: [undefined],
      },
    }
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      void fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <div className="space-y-4">
      {data?.pages.map((page, i) => (
        <div key={`page-${i}`} className="space-y-4">
          {page.items.map((vote) => (
            <VotingHistoryCard key={vote.id} vote={vote} />
          ))}
        </div>
      ))}

      <div className="flex justify-center py-4">
        {isFetchingNextPage ? (
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        ) : hasNextPage ? (
          <div ref={ref} className="h-4 w-full" />
        ) : (
          <p className="text-sm text-muted-foreground">
            Fim do histórico de votações.
          </p>
        )}
      </div>
    </div>
  );
}
