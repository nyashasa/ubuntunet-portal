import React from "react";

type RadioButtonProps = {
  id: string;
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
};

const RadioButton = ({
  id,
  label,
  value,
  checked,
  onChange,
}: RadioButtonProps) => {
  return (
    <label
      htmlFor={id}
      className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
        checked
          ? "border-purple bg-purple/5"
          : "border-gray-200 bg-white hover:border-purple/50"
      }`}
    >
      <div className="relative flex items-center justify-center">
        <input
          type="radio"
          id={id}
          name="survey-option"
          value={value}
          checked={checked}
          onChange={() => onChange(value)}
          className="sr-only"
        />
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
            checked
              ? "border-purple bg-purple"
              : "border-gray-300 bg-white"
          }`}
        >
          {checked && (
            <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
          )}
        </div>
      </div>
      <span
        className={`text-base font-medium ${
          checked ? "text-purple" : "text-gray-700"
        }`}
      >
        {label}
      </span>
    </label>
  );
};

export default RadioButton;

