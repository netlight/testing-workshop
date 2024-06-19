import { describe, expect, it, vi } from "vitest";
import { acknowledgeOperation } from "./OperationService";
import { mockOperation } from "@/models/Operation.mock";

globalThis.fetch = vi.fn();

describe("OperationService", () => {
  it("should acknowledge an operation", async () => {
    // arrange
    const operation = mockOperation();

    // act
    const result = await acknowledgeOperation(operation);

    // assert
    expect(result.isAcknowledged).toBe(true);
    expect(fetch).toHaveBeenCalledWith(
      "https://www.example.com/api/acknowledge",
      {
        body: JSON.stringify({ id: operation.id }),
        method: "POST",
      }
    );
  });
});
