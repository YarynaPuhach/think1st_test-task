import React, { useState } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

interface TextFieldProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  errorMessage?: string;
}

const TextField: React.FC<TextFieldProps> = ({ label, type = 'text', name, value, onChange, error = false, errorMessage = '' }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="mb-4">
      <label
        className={`block mb-2 ${error ? 'text-red-600' : 'text-custom-label'}`}
        style={{
          fontSize: '16px',
          fontWeight: 400,
          color: '#000853',
        }}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none transition-colors duration-300
          ${error
            ? 'border-red-500 bg-red-100'
            : isActive
              ? 'border-[#761BE4] bg-white'
              : 'border-[#CBB6E5] bg-white'
          }`}
      />
      {error && <ErrorMessage errorMessage={errorMessage} />}
    </div>
  );
};

export default TextField;