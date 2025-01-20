import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "./Navbar";
import * as scrollUtils from "../../hooks/styles/scrollUtils";

jest.mock("../../hooks/styles/scrollUtils", () => ({
  useScrollVisibility: jest.fn(),
}));

describe("Navbar Component", () => {
  test("renders navbar with correct brand name", () => {
    render(<Navbar />);
    expect(screen.getByText("Wolt")).toBeInTheDocument();
  });

  test("displays the 'show' class when useScrollVisibility returns true", () => {
    (scrollUtils.useScrollVisibility as jest.Mock).mockReturnValue(true);
    render(<Navbar />);
    const navbar = screen.getByRole("navigation");
    expect(navbar).toHaveClass("show");
  });

  test("displays the 'hide' class when useScrollVisibility returns false", () => {
    (scrollUtils.useScrollVisibility as jest.Mock).mockReturnValue(false);
    render(<Navbar />);
    const navbar = screen.getByRole("navigation");
    expect(navbar).toHaveClass("hide");
  });
});
