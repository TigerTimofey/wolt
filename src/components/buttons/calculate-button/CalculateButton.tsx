import React, { useMemo } from "react";
import debounce from "lodash.debounce";
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
  const debouncedOnClick = useMemo(() => debounce(onClick, 1000), [onClick]);

  return (
    <button
      className="calculate-button"
      onClick={debouncedOnClick}
      disabled={disabled}
      data-test-id={testId}
      title="Click to calculate your order"
      aria-label="Calculate order"
    >
      Calculate
    </button>
  );
};

export default CalculateButton;
