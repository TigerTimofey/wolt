import { render, screen, fireEvent } from "@testing-library/react";
import { cleanup } from "@testing-library/react";
import UserInput from "./UserInputProps";
import "@testing-library/jest-dom";
import { act } from "react";

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
  test("renders all input fields and buttons", () => {
    render(<UserInput {...defaultProps} />);

    expect(screen.getByLabelText("Venue Slug")).toBeInTheDocument();
    expect(screen.getByLabelText("Cart Value (EUR)")).toBeInTheDocument();
    expect(screen.getByLabelText("Latitude")).toBeInTheDocument();
    expect(screen.getByLabelText("Longitude")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /locate/i })).toBeInTheDocument();

    // expect(
    //   screen.getByRole("button", { name: /fetch location/i })
    // ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /calculate/i })
    ).toBeInTheDocument();
  });

  test("handles venueSlug change", () => {
    render(<UserInput {...defaultProps} />);
    const selectField = screen.getByTestId("venueSlug");

    fireEvent.change(selectField, {
      target: { value: "home-assignment-venue-tallinn" },
    });
    expect(mockSetVenueSlug).toHaveBeenCalledWith(
      "home-assignment-venue-tallinn"
    );
  });

  test("handles cartValue change", () => {
    render(<UserInput {...defaultProps} />);
    const cartValueField = screen.getByTestId("cartValue");

    fireEvent.change(cartValueField, { target: { value: "30" } });

    expect(mockSetCartValue).toHaveBeenCalledWith("30");
  });

  test("fetchLocation button click triggers the handler", () => {
    render(<UserInput {...defaultProps} />);

    // Get buttons by text or test-id
    const locationButton = screen.getByText(/locate/i); // Or use getByTestId('getLocation')
    const calculateButton = screen.getByText(/calculate/i); // Or use getByTestId('calculate-button')

    // Trigger click events
    fireEvent.click(locationButton);
    fireEvent.click(calculateButton);

    // Add expectations (e.g., check if functions were called)
    expect(mockFetchLocation).toHaveBeenCalled();
    expect(mockHandleCalculate).toHaveBeenCalled();
  });

  //   test("fetchLocation button click triggers the handler", () => {
  //     render(<UserInput {...defaultProps} />);
  //     const locationButton = screen.getByTestId('getLocation');

  //     fireEvent.click(locationButton);

  //     expect(mockFetchLocation).toHaveBeenCalled();
  //   });

  test("calculate button click triggers the handler", () => {
    render(<UserInput {...defaultProps} />);
    const calculateButton = screen.getByTestId("calculate-button");

    fireEvent.click(calculateButton);

    expect(mockHandleCalculate).toHaveBeenCalled();
  });

  test("displays latitude and longitude as disabled fields", () => {
    render(<UserInput {...defaultProps} />);
    const latitudeField = screen.getByTestId("userLatitude");
    const longitudeField = screen.getByTestId("userLongitude");

    expect(latitudeField).toBeDisabled();
    expect(longitudeField).toBeDisabled();
  });
  afterEach(() => {
    cleanup();
    jest.resetAllMocks(); // Reset mock functions if needed
  });
});
