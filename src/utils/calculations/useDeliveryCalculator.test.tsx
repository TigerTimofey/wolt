import { renderHook } from "@testing-library/react";
import { act } from "react";
import { useDeliveryCalculator } from "./useDeliveryCalculator";
import * as api from "../../utils/fetch/api";
import * as mathUtils from "../../utils/calculations/mathUtils";

describe("useDeliveryCalculator", () => {
  const venueSlug = "Tallinn";
  const cartValue = "12";
  const latitude = "59.43869";
  const longitude = "24.759395";

  const mockVenueStaticData = {
    venue_raw: {
      location: { coordinates: [24.753574, 59.437] }, // Example coordinates
    },
  };

  const mockVenueDynamicData = {
    venue_raw: {
      delivery_specs: {
        order_minimum_no_surcharge: 1000,
        delivery_pricing: {
          base_price: 190,
          distance_ranges: [{ min: 0, max: 500, a: 0, b: 0 }],
        },
      },
    },
  };

  beforeEach(() => {
    jest
      .spyOn(api, "fetchVenueStaticData")
      .mockResolvedValue(mockVenueStaticData);
    jest
      .spyOn(api, "fetchVenueDynamicData")
      .mockResolvedValue(mockVenueDynamicData);
    jest.spyOn(mathUtils, "calculateDistance").mockReturnValue(450); // Distance in meters
    jest
      .spyOn(mathUtils, "calculateDeliveryFee")
      .mockImplementation((distance, basePrice) => {
        return basePrice;
      });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should calculate delivery data for Tallinn correctly", async () => {
    const { result } = renderHook(() =>
      useDeliveryCalculator(venueSlug, cartValue, latitude, longitude)
    );

    await act(async () => {
      await result.current.handleCalculate();
    });

    expect(mathUtils.calculateDistance).toHaveBeenCalledWith(
      parseFloat(latitude),
      parseFloat(longitude),
      59.437,
      24.753574
    );

    expect(mathUtils.calculateDeliveryFee).toHaveBeenCalledWith(450, 190, [
      { min: 0, max: 500, a: 0, b: 0 },
    ]);

    expect(result.current.smallOrderSurcharge).toBe(0);
    expect(result.current.deliveryFee).toBe(190);
    expect(result.current.deliveryDistance).toBe(450);
    expect(result.current.totalPrice).toBe(1200 + 190);
    expect(result.current.error).toBe("");
    expect(result.current.deliveryNotAvailable).toBe(false);
  });

  it("should add surcharge for small orders", async () => {
    const smallCartValue = "8"; // €8
    const { result } = renderHook(() =>
      useDeliveryCalculator(venueSlug, smallCartValue, latitude, longitude)
    );

    await act(async () => {
      await result.current.handleCalculate();
    });

    expect(result.current.smallOrderSurcharge).toBe(200);
    expect(result.current.totalPrice).toBe(800 + 200 + 190);
  });

  it("should handle delivery not available for out-of-range distance", async () => {
    jest.spyOn(mathUtils, "calculateDistance").mockReturnValue(600);

    const { result } = renderHook(() =>
      useDeliveryCalculator(venueSlug, cartValue, latitude, longitude)
    );

    await act(async () => {
      await result.current.handleCalculate();
    });

    expect(result.current.deliveryNotAvailable).toBe(true);
    expect(result.current.totalPrice).toBe(0);
  });
});
