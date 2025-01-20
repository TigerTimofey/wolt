import { calculateDistance, calculateDeliveryFee } from "./mathUtils";

describe("mathUtils", () => {
  describe("calculateDistance", () => {
    test("returns 0 when both locations are the same", () => {
      const lat1 = 59.43869;
      const lon1 = 24.759395;
      const lat2 = 59.43869;
      const lon2 = 24.759395;

      const result = calculateDistance(lat1, lon1, lat2, lon2);

      expect(result).toBe(0);
    });

    test("calculates distance between two different locations", () => {
      const lat1 = 59.43869;
      const lon1 = 24.759395;
      const lat2 = 59.439106;
      const lon2 = 24.769556;

      const result = calculateDistance(lat1, lon1, lat2, lon2);

      expect(result).toBeGreaterThan(0);
    });
  });

  describe("calculateDeliveryFee", () => {
    
    test("calculates delivery fee based on distance ranges", () => {
      const distanceRanges = [
        { min: 0, max: 1000, a: 5, b: 2 },
        { min: 1001, max: 5000, a: 10, b: 3 },
      ];
      const basePrice = 10;
      const distance = 1500;

      const result = calculateDeliveryFee(distance, basePrice, distanceRanges);

      expect(result).toBe(basePrice + 10 + (3 * 1500) / 10);
    });

    test("returns 0 if distance is outside any range", () => {
      const distanceRanges = [
        { min: 0, max: 1000, a: 5, b: 2 },
        { min: 1001, max: 5000, a: 10, b: 3 },
      ];
      const basePrice = 10;
      const distance = 6000;

      const result = calculateDeliveryFee(distance, basePrice, distanceRanges);

      expect(result).toBe(0);
    });

    test("calculates delivery fee with open-ended range", () => {
      const distanceRanges = [
        { min: 0, max: 1000, a: 5, b: 2 },
        { min: 1001, max: 0, a: 10, b: 3 },
      ];
      const basePrice = 10;
      const distance = 1500;

      const result = calculateDeliveryFee(distance, basePrice, distanceRanges);

      expect(result).toBe(basePrice + 10 + (3 * 1500) / 10);
    });

    test("returns 0 if no ranges match the distance", () => {
      const distanceRanges: never[] = [];
      const basePrice = 10;
      const distance = 1500;

      const result = calculateDeliveryFee(distance, basePrice, distanceRanges);

      expect(result).toBe(0);
    });
  });
});
