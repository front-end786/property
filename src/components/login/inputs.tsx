import React from 'react';
import { InputProps } from '../types';

const Input: React.FC<InputProps> = ({ type, name, placeholder, value, onChange }) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full p-2 border border-gray-300 rounded-md"
  />
);

export default Input;
