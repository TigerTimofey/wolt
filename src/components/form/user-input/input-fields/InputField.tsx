import React from "react";
import { allowOnlyNumbersAndDot } from "../../../../utils/validations/inputValidation";

interface InputFieldProps {
  label: string;
  type: "text" | "number";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  testId: string;
  readOnly?: boolean;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  value,
  onChange,
  testId,
  readOnly = false,
  disabled = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    allowOnlyNumbersAndDot(e, onChange);
  };
  return (
    <div className="input-field">
      <input
        id={testId}
        type={type}
        value={value}
        onChange={handleChange}
        data-test-id={testId}
        placeholder=""
        disabled={disabled}
        readOnly={readOnly}
        className="input-text"
      />
      <label htmlFor={testId}>{label}</label>
    </div>
  );
};

export default InputField;
