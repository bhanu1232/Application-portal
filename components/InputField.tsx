
import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  containerClassName?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, id, containerClassName = '', ...props }) => {
  return (
    <div className={containerClassName}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
      />
    </div>
  );
};

export default InputField;
