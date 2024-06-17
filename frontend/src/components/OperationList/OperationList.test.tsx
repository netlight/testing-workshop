import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { OperationList } from ".";
import {
  acknowledgeOperation,
  getOperations,
} from "@/services/OperationService";
import { mockOperation } from "@/models/Operation.mock";
import userEvent from "@testing-library/user-event";
import { randAvatar, randFullName } from "@ngneat/falso";

vi.mock("@/services/OperationService");

describe("<OperationList />", () => {
  it("should render", () => {
    // arrange
    // TODO: Use vi.mocked to alter the behavior of getOperations
    // act
    // TODO: Render
    // assert
    // TODO: Assert that the component renders
  });

  it.todo("should acknowledge an operation");
});
