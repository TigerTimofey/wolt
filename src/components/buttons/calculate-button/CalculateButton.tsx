import React from "react";
import "./CalculateButton.css";

interface CalculateButtonProps {
  onClick: () => void;
  disabled?: boolean;
  testId?: string;
  loading?: boolean;
}

const CalculateButton: React.FC<CalculateButtonProps> = ({
  onClick,
  disabled = false,
  testId = "calculate-button",
}) => {
  return (
    <button
      className="calculate-button"
      onClick={onClick}
      disabled={disabled}
      data-testid={testId}
    >
      Calculate
    </button>
  );
};

export default CalculateButton;
