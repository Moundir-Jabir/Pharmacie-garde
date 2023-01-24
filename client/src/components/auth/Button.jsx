import React from "react";

const Button = ({ text, primary = true, type = "button",textColor=true}) => {
  return (
    <button
      type={type}
      className={`w-full px-4 py-2 tracking-wide ${textColor ? "text-black" : "text-white"} font-medium transition-colors duration-200 transform ${
        primary ? "bg-color-primary" : "bg-white"} hover:bg-color-secondary focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 border border-gray-200 rounded-md`}>
      {text}
    </button>
  );
};

export default Button;