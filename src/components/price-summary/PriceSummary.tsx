import React from "react";
import { convertToEUR, convertToKm } from "../../utils/calculations/convert";
import "./PriceSummary.css";
import yuhoStar from "../../assets/images/brand-yuho/star_yuho.png";
import yuho from "../../assets/images/brand-yuho/curious_yuho.png";

interface PriceSummaryProps {
  cartValue: number;
  smallOrderSurcharge: number;
  deliveryFee: number;
  deliveryDistance: number;
  totalPrice: number;
  deliveryNotAvailable: boolean;
}

const PriceSummary: React.FC<PriceSummaryProps> = ({
  cartValue,
  smallOrderSurcharge,
  deliveryFee,
  deliveryDistance,
  totalPrice,
  deliveryNotAvailable,
}) => {
  return (
    <div className="price-summary-container">
      {deliveryNotAvailable ? (
        <div className="error-container">
          <div className="container-card-error">
            <h2>Location not served</h2>
          </div>
          <img
            src={yuho}
            alt="Yuho cant deliver to this location"
            className="error-image"
          />
        </div>
      ) : totalPrice > 0 ? (
        <div className="price-summary">
          <h2>Order data</h2>
          <div className="divider-price-summary"></div>
          <p>
            Cart value{" "}
            <span
              data-test-id="cartValue"
              data-raw-value={cartValue}
              aria-label={`Cart value: ${convertToEUR(cartValue)} €`}
            >
              {convertToEUR(cartValue)} €
            </span>
          </p>
          <div className="divider-price-summary"></div>
          <p>
            Small order surcharge{" "}
            <span
              data-raw-value={smallOrderSurcharge}
              aria-label={`Small order surcharge: ${convertToEUR(
                smallOrderSurcharge
              )} €`}
            >
              {convertToEUR(smallOrderSurcharge)} €
            </span>
          </p>
          <div className="divider-price-summary"></div>
          <p>
            Delivery fee{" "}
            <span
              data-test-id="delivery-fee"
              data-raw-value={deliveryFee}
              aria-label={`Delivery fee: ${convertToEUR(deliveryFee)} €`}
            >
              {convertToEUR(deliveryFee)} €
            </span>
          </p>
          <div className="divider-price-summary"></div>

          <p>
            Delivery distance{" "}
            <span
              data-raw-value={deliveryDistance}
              aria-label={`Delivery distance: ${convertToKm(
                deliveryDistance
              )} km`}
            >
              <span
                className="info-icon"
                title={`${deliveryDistance} m`}
                aria-label="Information about delivery distance"
              >
                i
              </span>{" "}
              {convertToKm(deliveryDistance)} km
            </span>
          </p>

          <div className="divider-price-summary"></div>
          <p>
            Total price{" "}
            <span
              data-test-id="total-price"
              data-raw-value={totalPrice}
              aria-label={`Total price: ${convertToEUR(totalPrice)} €`}
            >
              {convertToEUR(totalPrice)} €
            </span>
          </p>
        </div>
      ) : (
        <div className="welcome-container">
          <div className="container-card-info">
            <h2>Please provide order data</h2>
          </div>
          <img
            src={yuhoStar}
            alt="Yuho waiting for order"
            className="error-image"
          />
        </div>
      )}
    </div>
  );
};

export default PriceSummary;
