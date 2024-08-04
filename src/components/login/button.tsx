import React from 'react';
// import { ButtonProps } from '../types';
export interface ButtonProps {
  type: "button" | "submit" | "reset";
  children: React.ReactNode;
  onClick?: () => void;
}
const Button: React.FC<ButtonProps> = ({ type, children, onClick }) => (
  <button
    type={type}
    onClick={onClick}
    className="w-full p-2 bg-black text-white rounded-md text-[18px] font-bold mt-4 hover:bg-gray-900"
  >
    {children}
  </button>
);

export default Button;
