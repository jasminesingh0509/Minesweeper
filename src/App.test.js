import React from "react";
import { render } from "@testing-library/react";
import Minesweeper from "./Minesweeper";

it("renders a reset button", () => {
  const { getByText } = render(<Minesweeper confirm>Reset</Minesweeper>);
  expect(getByText("Reset")).toHaveClass("reset");
});
