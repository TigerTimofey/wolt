import { render, screen } from "@testing-library/react";
import PriceSummary from "./PriceSummary";
import "@testing-library/jest-dom";
import { convertToEUR, convertToKm } from "../../utils/calculations/convert";

jest.mock("../../utils/calculations/convert", () => ({
  convertToEUR: jest.fn(),
  convertToKm: jest.fn(),
}));

describe("PriceSummary Component", () => {
  beforeEach(() => {
    (convertToEUR as jest.Mock).mockImplementation(
      (value: number) => `${value} €`
    );
    (convertToKm as jest.Mock).mockImplementation((value: number) =>
      (value / 1000).toFixed(2)
    );
  });

  test("renders location not served message when deliveryNotAvailable is true", () => {
    render(
      <PriceSummary
        cartValue={8}
        smallOrderSurcharge={2}
        deliveryFee={1.9}
        deliveryDistance={400}
        totalPrice={11.9}
        deliveryNotAvailable={true}
      />
    );

    expect(screen.getByText(/Location not served/)).toBeInTheDocument();
    expect(
      screen.getByAltText(/Yuho cant deliver to this location/)
    ).toBeInTheDocument();
  });

  test("renders order data when totalPrice is greater than 0", () => {
    render(
      <PriceSummary
        cartValue={100}
        smallOrderSurcharge={5}
        deliveryFee={10}
        deliveryDistance={1500}
        totalPrice={115}
        deliveryNotAvailable={false}
      />
    );

    expect(screen.getByText(/Cart value/)).toBeInTheDocument();
    expect(screen.getByText(/Small order surcharge/)).toBeInTheDocument();
    expect(screen.getByText(/Delivery fee/)).toBeInTheDocument();
    expect(screen.getByText(/Delivery distance/)).toBeInTheDocument();
    expect(screen.getByText(/Total price/)).toBeInTheDocument();
  });

  test("renders 'Please provide order data' and Venue is missing error when totalPrice is 0", () => {
    render(
      <PriceSummary
        cartValue={0}
        smallOrderSurcharge={0}
        deliveryFee={0}
        deliveryDistance={0}
        totalPrice={0}
        deliveryNotAvailable={false}
      />
    );

    expect(screen.getByText(/Please provide order data/)).toBeInTheDocument();
    expect(screen.getByAltText(/Yuho waiting for order/)).toBeInTheDocument();
  });

  test("handles very large delivery distance correctly", () => {
    render(
      <PriceSummary
        cartValue={100}
        smallOrderSurcharge={5}
        deliveryFee={10}
        deliveryDistance={1000000}
        totalPrice={115}
        deliveryNotAvailable={false}
      />
    );

    const distanceElement = screen.getByText(/1000.00/);
    expect(distanceElement).toBeInTheDocument();
    expect(convertToKm).toHaveBeenCalledWith(1000000);
  });

  test("ensures alt text and aria-labels are properly applied", () => {
    render(
      <PriceSummary
        cartValue={0}
        smallOrderSurcharge={0}
        deliveryFee={0}
        deliveryDistance={0}
        totalPrice={0}
        deliveryNotAvailable={true}
      />
    );

    const image = screen.getByAltText(/Yuho cant deliver to this location/);
    expect(image).toBeInTheDocument();
  });

  test("displays correct image when no order data is provided", () => {
    render(
      <PriceSummary
        cartValue={0}
        smallOrderSurcharge={0}
        deliveryFee={0}
        deliveryDistance={0}
        totalPrice={0}
        deliveryNotAvailable={false}
      />
    );

    const image = screen.getByAltText(/Yuho waiting for order/);
    expect(image).toBeInTheDocument();
  });

  test("displays correct image when location is not served", () => {
    render(
      <PriceSummary
        cartValue={8}
        smallOrderSurcharge={2}
        deliveryFee={1.9}
        deliveryDistance={400}
        totalPrice={11.9}
        deliveryNotAvailable={true}
      />
    );

    const image = screen.getByAltText(/Yuho cant deliver to this location/);
    expect(image).toBeInTheDocument();
  });

  test("correctly displays delivery distance with info icon", () => {
    render(
      <PriceSummary
        cartValue={100}
        smallOrderSurcharge={5}
        deliveryFee={10}
        deliveryDistance={3000}
        totalPrice={115}
        deliveryNotAvailable={false}
      />
    );

    const distanceElement = screen.getByText("3.00 km");
    expect(distanceElement).toBeInTheDocument();

    const infoIcon = screen.getByTitle("3000 m");
    expect(infoIcon).toBeInTheDocument();
  });

  test("renders no data when total price is 0 and delivery is unavailable", () => {
    render(
      <PriceSummary
        cartValue={0}
        smallOrderSurcharge={0}
        deliveryFee={0}
        deliveryDistance={0}
        totalPrice={0}
        deliveryNotAvailable={true}
      />
    );

    expect(screen.getByText("Location not served")).toBeInTheDocument();
    expect(
      screen.getByAltText("Yuho cant deliver to this location")
    ).toBeInTheDocument();
  });
});
