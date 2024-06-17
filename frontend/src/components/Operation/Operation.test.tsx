import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Operation } from ".";
import { mockOperation } from "@/models/Operation.mock";
import userEvent from "@testing-library/user-event";

describe("<Operation />", () => {
  it("should render", () => {
    // arrange
    const operation = mockOperation();

    // act
    render(<Operation operation={operation} />);

    // assert
    expect(
      screen.getByText(operation.id, { exact: false })
    ).toBeInTheDocument();
    expect(screen.getByText(operation.description)).toBeInTheDocument();
    expect(screen.getByText(operation.address)).toBeInTheDocument();
    expect(
      screen.queryByText(operation.longDescription)
    ).not.toBeInTheDocument();
  });

  it("should show details on click", async () => {
    // arrange
    const operation = mockOperation();
    const user = userEvent.setup();
    render(<Operation operation={operation} />);

    // act
    await user.click(screen.getByText(operation.description));

    // assert
    expect(screen.getByText(operation.longDescription)).toBeInTheDocument();
  });

  it("should trigger onAcknowledge when clicking on the button", async () => {
    // arrange
    const operation = mockOperation({ isAcknowledged: false });
    const user = userEvent.setup();
    const onAcknowledge = vi.fn();
    render(<Operation operation={operation} onAcknowledge={onAcknowledge} />);

    // act
    await user.click(screen.getByRole("button", { name: "Acknowledge" }));

    // assert
    expect(onAcknowledge).toHaveBeenCalled();
  });
});
