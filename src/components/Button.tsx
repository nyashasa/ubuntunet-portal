import React from "react";

type ButtonProps = {
  className?: string;
  children: React.ReactNode;
  variant?: "default" | "outline";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  className,
  children,
  onClick,
  variant = "default",
}: ButtonProps) => {
  return (
    <button
      className={`bg-orange  w-48 p-2 rounded-xl cursor-pointer h-10  ${
        variant === "outline"
          ? "bg-transparent border border-orange text-orange hover:bg-orange hover:text-white"
          : "text-white hover:bg-orange/80"
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
