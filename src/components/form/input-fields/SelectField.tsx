// В файле SelectField.tsx
interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  testId: string;
  options: { value: string; label: string }[];
  className?: string; // Сделаем className опциональным
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  onChange,
  testId,
  options,
  className,
}) => (
  <div className={`input-field ${className || ""}`}>
    <select value={value} onChange={onChange} data-test-id={testId}>
      <option value="" disabled>
        Select Venue
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <label>{label}</label>
  </div>
);

export default SelectField;
