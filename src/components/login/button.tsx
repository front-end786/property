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
    
  >
    {children}
  </button>
);

export default Button;
