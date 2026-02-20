/**
 * @jest-environment node
 */
import type {
  Parlamentar,
  Proposicao,
  SyncLog,
  VoteEvent,
  VoteRecord,
} from "../../generated/prisma";

describe("Prisma Database Schema", () => {
  it("should have all 5 models typed", () => {
    // Type inference test — this will fail at compile time if models missing
    const _parlamentar: Parlamentar = {} as Parlamentar;
    const _voteEvent: VoteEvent = {} as VoteEvent;
    const _voteRecord: VoteRecord = {} as VoteRecord;
    const _proposicao: Proposicao = {} as Proposicao;
    const _syncLog: SyncLog = {} as SyncLog;

    expect(true).toBe(true);
  });

  it("should have correct Parlamentar id format (String)", () => {
    // Parlamentar.id must be String (not Int) to support "dep-{id}" format
    type ParlamentarId = Parlamentar["id"];
    const _id: ParlamentarId = "dep-123";
    expect(typeof _id).toBe("string");
  });

  it("should have correct VoteEvent externalId format (String)", () => {
    // VoteEvent.externalId must be String to support composite IDs like "2600277-9"
    type ExternalId = VoteEvent["externalId"];
    const _externalId: ExternalId = "2600277-9";
    expect(typeof _externalId).toBe("string");
  });
});
