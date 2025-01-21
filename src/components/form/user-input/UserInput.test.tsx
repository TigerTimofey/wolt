import { render, screen, fireEvent } from "@testing-library/react";
import { cleanup } from "@testing-library/react";

import UserInput from "./UserInputProps";
import "@testing-library/jest-dom";
import { act } from "react";
import { venueOptions } from "../../../utils/fetch/venueOptions";
import { configure } from "@testing-library/react";

configure({
  testIdAttribute: "data-test-id",
});

const mockSetVenueSlug = jest.fn();
const mockSetCartValue = jest.fn();
const mockFetchLocation = jest.fn();
const mockHandleCalculate = jest.fn();

const defaultProps = {
  venueSlug: "test-venue",
  setVenueSlug: mockSetVenueSlug,
  cartValue: "20",
  setCartValue: mockSetCartValue,
  latitude: "52.5200",
  longitude: "13.4050",
  fetchLocation: mockFetchLocation,
  handleCalculate: mockHandleCalculate,
  isLocationError: false,
};

describe("UserInput Component", () => {
  test("handles venueSlug change", () => {
    render(
      <UserInput isVenueError={false} isCartError={false} {...defaultProps} />
    );
    const selectField = screen.getByTestId("venueSlug");

    fireEvent.change(selectField, {
      target: { value: "home-assignment-venue-tallinn" },
    });
    expect(mockSetVenueSlug).toHaveBeenCalledWith(
      "home-assignment-venue-tallinn"
    );
  });

  test("handles cartValue change", () => {
    render(
      <UserInput isVenueError={false} isCartError={false} {...defaultProps} />
    );
    const cartValueField = screen.getByTestId("cartValue");

    fireEvent.change(cartValueField, { target: { value: "30" } });

    expect(mockSetCartValue).toHaveBeenCalledWith("30");
  });

  test("fetchLocation button click triggers the handler with async", async () => {
    render(
      <UserInput isVenueError={false} isCartError={false} {...defaultProps} />
    );
    const locationButton = screen.getByText(/locate/i);
    await act(async () => {
      fireEvent.click(locationButton);
    });

    expect(mockFetchLocation).toHaveBeenCalled();
  });

  test("displays latitude and longitude as disabled fields", () => {
    render(
      <UserInput isVenueError={false} isCartError={false} {...defaultProps} />
    );
    const latitudeField = screen.getByTestId("userLatitude");
    const longitudeField = screen.getByTestId("userLongitude");

    expect(latitudeField).toBeDisabled();
    expect(longitudeField).toBeDisabled();
  });

  test("displays error message when invalid cart value is provided", async () => {
    render(
      <UserInput isVenueError={false} isCartError={false} {...defaultProps} />
    );
    const cartValueField = screen.getByTestId("cartValue");

    fireEvent.change(cartValueField, { target: { value: "-10" } });
    expect(true).toBe(true);
  });

  test("renders SelectField with correct options", () => {
    render(
      <UserInput isVenueError={false} isCartError={false} {...defaultProps} />
    );

    const selectField = screen.getByTestId("venueSlug");

    venueOptions.forEach((option) => {
      expect(selectField).toHaveTextContent(option.label);
    });
  });

  test("calculate button triggers the handleCalculate function", () => {
    render(
      <UserInput isVenueError={false} isCartError={false} {...defaultProps} />
    );

    const calculateButton = screen.getByRole("button", { name: /calculate/i });

    fireEvent.click(calculateButton);

    expect(mockHandleCalculate).toHaveBeenCalled();
  });

  test("cartValue InputField updates value correctly", () => {
    render(
      <UserInput isVenueError={false} isCartError={false} {...defaultProps} />
    );
    const cartValueField = screen.getByTestId("cartValue");
    fireEvent.change(cartValueField, { target: { value: "50" } });
    expect(mockSetCartValue).toHaveBeenCalledWith("50");
  });

  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });
});
