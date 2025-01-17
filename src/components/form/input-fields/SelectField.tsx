import React from "react";
interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  testId: string;
  options: { value: string; label: string }[];
  disabled?: boolean;
  className?: string;
}
const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  onChange,
  testId,
  options,
  disabled = false,
  className,
}) => {
  return (
    <div className={`input-field ${className || ""}`}>
      <select
        id={testId}
        value={value}
        onChange={onChange}
        data-testid={testId}
        disabled={disabled}
        className="input-text"
      >
        <option value="" disabled>
          Select Venue
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {value && <label htmlFor={testId}>{label}</label>}{" "}
    </div>
  );
};
export default SelectField;
