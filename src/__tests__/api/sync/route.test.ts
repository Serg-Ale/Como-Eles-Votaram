/**
 * @jest-environment node
 */
import { POST } from "@/app/api/sync/route";
import { runFullSync, runPartialSync } from "@/server/sync/orchestrator";
import { NextRequest } from "next/server";

jest.mock("@/server/sync/orchestrator", () => ({
  runFullSync: jest.fn(),
  runPartialSync: jest.fn(),
}));

jest.mock("@/env", () => ({
  env: {
    SYNC_SECRET: "test-secret-key",
  },
}));

describe("POST /api/sync", () => {
  const createRequest = (
    body: unknown,
    authHeader?: string
  ): NextRequest => {
    const url = "http://localhost:3000/api/sync";
    return new NextRequest(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(authHeader ? { authorization: authHeader } : {}),
      },
      body: JSON.stringify(body),
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns 401 when Authorization header is missing", async () => {
    const request = createRequest({});
    const response = await POST(request);

    expect(response.status).toBe(401);
    const data = await response.json();
    expect(data).toEqual({ error: "Unauthorized" });
  });

  it("returns 401 when Authorization header is invalid", async () => {
    const request = createRequest({}, "Bearer wrong-secret");
    const response = await POST(request);

    expect(response.status).toBe(401);
    const data = await response.json();
    expect(data).toEqual({ error: "Unauthorized" });
  });

  it("accepts valid Authorization header", async () => {
    (runFullSync as jest.Mock).mockResolvedValue({
      success: true,
      synced: { parlamentares: 0, votacoes: 0, votos: 0, proposicoes: 0 },
      errors: [],
      duration: 1000,
    });

    const request = createRequest({}, "Bearer test-secret-key");
    const response = await POST(request);

    expect(response.status).toBe(200);
    expect(runFullSync).toHaveBeenCalled();
  });

  it("runs full sync when source is not specified", async () => {
    (runFullSync as jest.Mock).mockResolvedValue({
      success: true,
      synced: { parlamentares: 25, votacoes: 10, votos: 200, proposicoes: 50 },
      errors: [],
      duration: 5000,
    });

    const request = createRequest({}, "Bearer test-secret-key");
    const response = await POST(request);

    expect(runFullSync).toHaveBeenCalled();
    expect(runPartialSync).not.toHaveBeenCalled();

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.synced.parlamentares).toBe(25);
  });

  it("runs full sync when source is 'all'", async () => {
    (runFullSync as jest.Mock).mockResolvedValue({
      success: true,
      synced: { parlamentares: 25, votacoes: 10, votos: 200, proposicoes: 50 },
      errors: [],
      duration: 5000,
    });

    const request = createRequest({ source: "all" }, "Bearer test-secret-key");
    const response = await POST(request);

    expect(runFullSync).toHaveBeenCalled();
    expect(runPartialSync).not.toHaveBeenCalled();
  });

  it("runs partial sync for camara", async () => {
    (runPartialSync as jest.Mock).mockResolvedValue({
      success: true,
      synced: { parlamentares: 10, votacoes: 5, votos: 100, proposicoes: 20 },
      errors: [],
      duration: 2000,
    });

    const request = createRequest(
      { source: "camara" },
      "Bearer test-secret-key"
    );
    const response = await POST(request);

    expect(runPartialSync).toHaveBeenCalledWith("camara", undefined);
    expect(runFullSync).not.toHaveBeenCalled();

    const data = await response.json();
    expect(data.synced.parlamentares).toBe(10);
  });

  it("runs partial sync for senado", async () => {
    (runPartialSync as jest.Mock).mockResolvedValue({
      success: true,
      synced: { parlamentares: 15, votacoes: 8, votos: 150, proposicoes: 30 },
      errors: [],
      duration: 2500,
    });

    const request = createRequest(
      { source: "senado" },
      "Bearer test-secret-key"
    );
    const response = await POST(request);

    expect(runPartialSync).toHaveBeenCalledWith("senado", undefined);
  });

  it("runs partial sync with specific entity", async () => {
    (runPartialSync as jest.Mock).mockResolvedValue({
      success: true,
      synced: { parlamentares: 10, votacoes: 0, votos: 0, proposicoes: 0 },
      errors: [],
      duration: 1000,
    });

    const request = createRequest(
      { source: "camara", entity: "parlamentares" },
      "Bearer test-secret-key"
    );
    const response = await POST(request);

    expect(runPartialSync).toHaveBeenCalledWith("camara", "parlamentares");
  });

  it("returns 400 for invalid source", async () => {
    const request = createRequest(
      { source: "invalid" },
      "Bearer test-secret-key"
    );
    const response = await POST(request);

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toContain("Invalid source");
  });

  it("returns 500 when sync throws error", async () => {
    (runFullSync as jest.Mock).mockRejectedValue(
      new Error("Database connection failed")
    );

    const request = createRequest({}, "Bearer test-secret-key");
    const response = await POST(request);

    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data.error).toBe("Database connection failed");
  });

  it("returns sync report with errors when sync partially succeeds", async () => {
    (runFullSync as jest.Mock).mockResolvedValue({
      success: false,
      synced: { parlamentares: 10, votacoes: 5, votos: 100, proposicoes: 0 },
      errors: ["Failed to sync proposicoes", "API timeout"],
      duration: 8000,
    });

    const request = createRequest({}, "Bearer test-secret-key");
    const response = await POST(request);

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.errors).toHaveLength(2);
    expect(data.errors).toContain("Failed to sync proposicoes");
  });
});
