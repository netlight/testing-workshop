import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Operation } from ".";
import { mockOperation } from "@/models/Operation.mock";
import userEvent from "@testing-library/user-event";

describe("<Operation />", () => {
  it("should render", () => {
    // arrange
    // TODO: Create the mocks we need
    // act
    // TODO: Render the component (import { render } from "@testing-library/react")
    // assert
    // TODO: Expect that some text is now on the screen (import { screen } from "@testing-library/react")
  });

  it("should show details on click", async () => {
    // arrange
    // TODO: Create the mocks we need
    // TODO: Render the component
    const user = userEvent.setup();

    // act
    // TODO: Click on the description to show the long description (await user.click(screen.getByText(...)))

    // assert
    // TODO. Expect that we see the long description
  });

  it.todo("should trigger onAcknowledge when clicking on the button");
});
