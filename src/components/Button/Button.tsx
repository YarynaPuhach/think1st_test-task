import React from 'react';

interface ButtonProps {
  onClick?: (e: React.FormEvent) => Promise<void>;
  state?: 'default' | 'inactive';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, state = 'default', children }) => {
  const baseClass = 'inline-block w-full px-6 py-3 text-white rounded focus:outline-none';
  const stateClass = state === 'inactive' ? 'bg-gray-300 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-500';

  return (
    <button onClick={onClick} className={`${baseClass} ${stateClass}`} disabled={state === 'inactive'}>
      {children}
    </button>
  );
};

export default Button;