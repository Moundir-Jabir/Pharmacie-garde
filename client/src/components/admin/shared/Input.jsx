import React from "react";

const Input = ({type, name, id, placeholder, onChange, value}) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      className="block w-full px-4 py-2  text-gray-700 placeholder-gray-400 bg-white border border-gray-200 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
    />
  );
}

export default Input;