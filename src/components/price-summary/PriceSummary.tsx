import React from "react";
import { convertToEUR, convertToKm } from "../../utils/convert";
import "./PriceSummary.css";
import yuhoRocket from "/yuho-rocket.png";
import yuhoStar from "/star_yuho.png";
import yuho from "/curious_yuho.png";

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
          <h2>Distance not served</h2>
          <img src={yuho} alt="Error rocket" className="error-image" />
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
              {convertToKm(deliveryDistance)} km
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
          <h2>Please provide order data</h2>
          <img src={yuhoStar} alt="Yuho Rocket" className="error-image" />
        </div>
      )}
    </div>
  );
};

export default PriceSummary;
