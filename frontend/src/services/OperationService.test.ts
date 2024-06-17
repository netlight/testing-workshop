import { describe, expect, it, vi } from "vitest";
import { acknowledgeOperation } from "./OperationService";
import { mockOperation } from "@/models/Operation.mock";

globalThis.fetch = vi.fn();

describe("OperationService", () => {
  it.todo("should acknowledge an operation");
});
