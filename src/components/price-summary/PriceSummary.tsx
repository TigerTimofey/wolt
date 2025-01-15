import React from "react";
import { convertToEUR, convertToKm } from "../../utils/convert";
import "./PriceSummary.css";

interface PriceSummaryProps {
  cartValue: number;
  smallOrderSurcharge: number;
  deliveryFee: number;
  deliveryDistance: number;
  totalPrice: number;
}

const PriceSummary: React.FC<PriceSummaryProps> = ({
  cartValue,
  smallOrderSurcharge,
  deliveryFee,
  deliveryDistance,
  totalPrice,
}) => {
  return (
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
        <span data-raw-value={deliveryFee}>{convertToEUR(deliveryFee)} €</span>
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
        <span data-raw-value={totalPrice}>{convertToEUR(totalPrice)} €</span>
      </p>
      <div className="divider-price-summary"></div>
    </div>
  );
};

export default PriceSummary;
