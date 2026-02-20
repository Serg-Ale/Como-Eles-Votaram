import { CamaraWrapperSchema } from "@/lib/schemas";

import { fetchAllPages, fetchCamara } from "@/server/sync/camara/client";

describe("camara client", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it("fetchCamara validates wrapper schema", async () => {
    const payload = {
      dados: [{ id: 1 }],
      links: [{ rel: "self", href: "https://example.com" }],
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => payload,
    });

    const result = await fetchCamara("/deputados");
    expect(result).toEqual(CamaraWrapperSchema.parse(payload));
  });

  it("fetchCamara keeps absolute URLs", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ dados: [], links: [] }),
    });

    await fetchCamara("https://dadosabertos.camara.leg.br/api/v2/deputados");

    expect((global.fetch as jest.Mock).mock.calls[0]?.[0]).toBe(
      "https://dadosabertos.camara.leg.br/api/v2/deputados"
    );
  });

  it("fetchCamara throws descriptive error on non-ok response", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 429,
      statusText: "Too Many Requests",
      json: async () => ({ dados: [] }),
    });

    await expect(fetchCamara("/deputados")).rejects.toThrow(
      "Camara API request failed: 429 Too Many Requests"
    );
  });

  it("fetchCamara times out after 10s", async () => {
    jest.useFakeTimers();
    (global.fetch as jest.Mock).mockImplementation(
      (_url: string, init: RequestInit) =>
        new Promise((_resolve, reject) => {
          init.signal?.addEventListener("abort", () => {
            const error = new Error("Aborted");
            error.name = "AbortError";
            reject(error);
          });
        })
    );

    const promise = fetchCamara("/deputados");
    jest.advanceTimersByTime(10_000);

    await expect(promise).rejects.toThrow(
      "Camara API request timed out after 10s"
    );
  });

  it("fetchAllPages follows next links", async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          dados: [{ id: 1 }],
          links: [{ rel: "next", href: "https://next.page" }],
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          dados: [{ id: 2 }],
          links: [{ rel: "self", href: "https://next.page" }],
        }),
      });

    const result = await fetchAllPages("/deputados");
    expect(result).toEqual([{ id: 1 }, { id: 2 }]);
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect((global.fetch as jest.Mock).mock.calls[1]?.[0]).toBe(
      "https://next.page"
    );
  });

  it("fetchAllPages stops when next link missing", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        dados: [{ id: 1 }],
      }),
    });

    const result = await fetchAllPages("/deputados");

    expect(result).toEqual([{ id: 1 }]);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("fetchAllPages returns empty array for empty data", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ dados: [], links: [] }),
    });

    const result = await fetchAllPages("/deputados");

    expect(result).toEqual([]);
  });

  it("fetchCamara rejects invalid wrapper data", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ dados: "invalid" }),
    });

    await expect(fetchCamara("/deputados")).rejects.toThrow();
  });

  it("fetchAllPages throttles between requests", async () => {
    jest.useFakeTimers();
    const calls: number[] = [];

    (global.fetch as jest.Mock)
      .mockImplementationOnce(async () => {
        calls.push(Date.now());
        return {
          ok: true,
          json: async () => ({
            dados: [{ id: 1 }],
            links: [{ rel: "next", href: "https://next.page" }],
          }),
        };
      })
      .mockImplementationOnce(async () => {
        calls.push(Date.now());
        return {
          ok: true,
          json: async () => ({
            dados: [{ id: 2 }],
            links: [{ rel: "self", href: "https://next.page" }],
          }),
        };
      });

    const promise = fetchAllPages("/deputados");
    await Promise.resolve();
    await jest.advanceTimersByTimeAsync(200);

    const result = await promise;
    expect(result).toEqual([{ id: 1 }, { id: 2 }]);

    expect(calls.length).toBe(2);
    expect((calls[1] ?? 0) - (calls[0] ?? 0)).toBeGreaterThanOrEqual(200);
  });
});
