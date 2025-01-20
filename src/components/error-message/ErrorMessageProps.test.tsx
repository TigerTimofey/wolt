import { render, screen } from "@testing-library/react";
import ErrorMessage from "./ErrorMessageProps";
import "@testing-library/jest-dom";

const mockOnClose = jest.fn();

describe("ErrorMessage Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the error message", () => {
    render(<ErrorMessage message="Error occurred!" onClose={mockOnClose} />);
    expect(screen.getByText("Error occurred!")).toBeInTheDocument();
  });
});
