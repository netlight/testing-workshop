import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Operation } from ".";
import { mockOperation } from "@/models/Operation.mock";
import userEvent from "@testing-library/user-event";
import { debug } from "vitest-preview";

describe("<Operation />", () => {
  it("should render", () => {
    // arrange
    const operation = mockOperation();

    // act
    render(<Operation operation={operation} />);

    // assert
    expect(screen.getByText(operation.description)).toBeInTheDocument();
    expect(screen.getByText(operation.address)).toBeVisible();
  });

  it("should show details on click", async () => {
    // arrange
    const operation = mockOperation();
    render(<Operation operation={operation} />);
    const user = userEvent.setup();
    expect(
      screen.queryByText(operation.longDescription)
    ).not.toBeInTheDocument();

    // act
    await user.click(
      screen.getByRole("button", {
        name: "toggle details",
      })
    );

    // assert
    expect(screen.getByText(operation.longDescription)).toBeInTheDocument();
  });

  it("should trigger onAcknowledge when clicking on the button", async () => {
    // arrange
    const onAcknowledge = vi.fn();
    const operation = mockOperation({ isAcknowledged: false });
    render(<Operation operation={operation} onAcknowledge={onAcknowledge} />);
    const user = userEvent.setup();

    // act
    debug();
    await user.click(screen.getByRole("button", { name: "Acknowledge" }));

    // assert
    expect(onAcknowledge).toBeCalled();
  });
});
