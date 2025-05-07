import React from "react";
import { Link } from "react-router-dom";

/**
 * Reusable Button component for ReactJS
 */
const CustomButton = ({
  to,
  text = "Button",
  bgColor = "red-600",
  textColor = "white",
  hoverBgColor = "white",
  hoverTextColor = "red-600",
  borderColor = "red-600",
  position = "center",
  width = "auto",
  height = "auto",
  disabled = false,
  onClick = () => {},
  icon = null,
  className = "",
  type = "button",
}) => {
  // Position classes
  const getPositionClass = () => {
    switch (position) {
      case "left":
        return "justify-start";
      case "right":
        return "justify-end";
      default:
        return "justify-center";
    }
  };

  // Width class
  const getWidthClass = () => {
    if (width === "full") return "w-full";
    if (width === "auto") return "w-auto";
    return `w-[${width}]`;
  };

  // Height class
  const getHeightClass = () => {
    if (height === "auto") return "";
    return `h-[${height}]`;
  };

  // Common button styles
  const buttonStyles = `
    py-[12px] 
    px-[24px] 
    inline-flex 
    items-center 
    ${getPositionClass()}
    rounded-lg 
    gap-[10px] 
    bg-${bgColor} 
    border-2 
    border-${borderColor} 
    text-${textColor} 
    ${getWidthClass()} 
    ${getHeightClass()}
    disabled:bg-gray-300 
    disabled:pointer-events-none 
    hover:bg-${hoverBgColor} 
    hover:text-${hoverTextColor} 
    transition 
    duration-300 
    ease-in-out
    ${className}
  `;

  // Render as Link if 'to' prop is provided, otherwise as button
  if (to) {
    return (
      <Link
        to={to}
        className={buttonStyles}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
            return;
          }
          onClick(e);
        }}
        aria-disabled={disabled}
      >
        {icon && <span className="inline-block">{icon}</span>}
        <span className="inline text-center text-base font-medium">{text}</span>
      </Link>
    );
  }

  // Render as regular button
  return (
    <button
      type={type}
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="inline-block">{icon}</span>}
      <span className="inline text-center text-base font-medium">{text}</span>
    </button>
  );
};

export default CustomButton;
