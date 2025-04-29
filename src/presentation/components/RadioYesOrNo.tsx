import React from "react";

type RadioSiNoProps = {
  label: string;
  value: boolean | null;
  name: string;
  required: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

const RadioYesOrNo: React.FC<RadioSiNoProps> = ({
  label,
  value,
  name,
  required,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <p className="mb-2 text-gray-700 font-medium">{label}</p>
      <div className="flex space-x-6">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name={name}
            value="true"
            checked={value === true}
            onChange={onChange}
            required={required}
            className="h-4 w-4 text-yellow-600 focus:ring-yellow-500"
          />
          <span>Sí</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name={name}
            value="false"
            checked={value === false}
            onChange={onChange}
            className="h-4 w-4 text-yellow-600 focus:ring-yellow-500"
          />
          <span>No</span>
        </label>
      </div>
    </div>
  );
};

export default RadioYesOrNo;
