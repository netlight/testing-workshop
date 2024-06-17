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
    const operations = [mockOperation(), mockOperation()];
    vi.mocked(getOperations).mockReturnValue(operations);

    // act
    render(<OperationList />);

    // assert
    expect(screen.getByText(operations[0].address)).toBeInTheDocument();
    expect(screen.getByText(operations[1].address)).toBeInTheDocument();
  });

  it("should acknowledge an operation", async () => {
    // arrange
    const operations = [
      mockOperation({ isAcknowledged: true }),
      mockOperation({ isAcknowledged: false }),
    ];
    vi.mocked(getOperations).mockReturnValue(operations);
    vi.mocked(acknowledgeOperation).mockImplementation((operation) =>
      Promise.resolve({
        ...operation,
        isAcknowledged: true,
        assignee: randFullName(),
        assigneeAvatar: randAvatar(),
      })
    );
    render(<OperationList />);
    const user = userEvent.setup();

    // act
    await user.click(screen.getByText("Acknowledge"));

    // assert
    expect(screen.queryByText("Acknowledge")).not.toBeInTheDocument();
  });
});
