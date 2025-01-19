import { render, screen } from "@testing-library/react";

import { Person } from "./Person";
import "@testing-library/jest-dom";

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation((message) => {
    if (message && message.includes("ReactDOMTestUtils.act")) return;
    console.error(message);
  });
});

afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

test("renders a name", () => {
  render(<Person name="Jack" />);
  const divElement = screen.getByRole("contentinfo");

  expect(divElement).toHaveTextContent("Name is Jack");
});
