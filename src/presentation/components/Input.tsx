import React from "react";

interface InputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  required?: boolean;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  value,
  required = false,
  disabled = false,
  onChange,
}) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        onChange={onChange}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-(--green-color) focus:border-(--green-color)"
      />
    </div>
  );
};

export default Input;
