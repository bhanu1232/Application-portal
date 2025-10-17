
import React from 'react';

interface RadioGroupProps<T extends string> {
  label: string;
  name: string;
  options: { value: T; label: string }[];
  selectedValue: T;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inline?: boolean;
}

const RadioGroup = <T extends string,>({ label, name, options, selectedValue, onChange, inline = true }: RadioGroupProps<T>) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className={`mt-2 ${inline ? 'flex flex-wrap gap-x-4 gap-y-2' : 'space-y-2'}`}>
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              id={`${name}-${option.value}`}
              name={name}
              type="radio"
              value={option.value}
              checked={selectedValue === option.value}
              onChange={onChange}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor={`${name}-${option.value}`} className="ml-2 block text-sm text-gray-900">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
