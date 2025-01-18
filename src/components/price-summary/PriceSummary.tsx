import React from "react";
import { convertToEUR, convertToKm } from "../../utils/calculations/convert";
import "./PriceSummary.css";
import yuhoStar from "/images/brand-yuho/star_yuho.png";
import yuho from "/images/brand-yuho/curious_yuho.png";

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
            <span data-raw-value={cartValue}>{convertToEUR(cartValue)} €</span>
          </p>
          <div className="divider-price-summary"></div>
          <p>
            Small order surcharge{" "}
            <span data-raw-value={smallOrderSurcharge}>
              {convertToEUR(smallOrderSurcharge)} €
            </span>
          </p>
          <div className="divider-price-summary"></div>
          <p>
            Delivery fee{" "}
            <span data-raw-value={deliveryFee}>
              {convertToEUR(deliveryFee)} €
            </span>
          </p>
          <div className="divider-price-summary"></div>

          <p>
            Delivery distance{" "}
            <span data-raw-value={deliveryDistance}>
              {" "}
              <span
                className="info-icon"
                title={`${convertToKm(deliveryDistance)} km`}
              >
                i
              </span>{" "}
              {deliveryDistance} m
            </span>
          </p>

          <div className="divider-price-summary"></div>
          <p>
            Total price{" "}
            <span data-raw-value={totalPrice}>
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
