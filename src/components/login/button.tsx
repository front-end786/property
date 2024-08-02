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
    className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
  >
    {children}
  </button>
);

export default Button;
