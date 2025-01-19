import React from "react";

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
  return (
    <div className="input-field">
      <input
        id={testId}
        type={type}
        value={value}
        onChange={onChange}
        data-testid={testId} // Corrected to data-testid
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
