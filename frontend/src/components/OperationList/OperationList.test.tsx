import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
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
  it("should render", async () => {
    // arrange
    const operation = mockOperation();
    vi.mocked(getOperations).mockResolvedValue([operation]);

    // act
    render(<OperationList />);

    // assert
    await waitForElementToBeRemoved(screen.getByText("Loading..."));
    expect(await screen.findByText(operation.description)).toBeInTheDocument();
  });

  it.todo("should acknowledge an operation");
});
