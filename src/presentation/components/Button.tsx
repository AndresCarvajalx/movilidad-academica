import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  onClick,
  className,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`bg-green-50 border border-green-600 text-(--green-color) font-semibold inline-flex items-center justify-center gap-2 py-2 px-4 rounded-lg shadow hover:bg-green-100 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
