import { env } from "@/env";
import { runFullSync, runPartialSync } from "@/server/sync/orchestrator";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const secret = env.SYNC_SECRET;

  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { source, entity } = body as {
      source?: "all" | "camara" | "senado";
      entity?: "parlamentares" | "votacoes" | "proposicoes";
    };

    if (!source || source === "all") {
      const result = await runFullSync();
      return NextResponse.json(result, { status: 200 });
    }

    if (source !== "camara" && source !== "senado") {
      return NextResponse.json(
        { error: "Invalid source. Must be 'camara' or 'senado'" },
        { status: 400 }
      );
    }

    const result = await runPartialSync(source, entity);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
