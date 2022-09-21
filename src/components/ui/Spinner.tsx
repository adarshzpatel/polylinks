import clsx from "clsx";
import React from "react";


interface Props {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
  variant?:  'primary' | 'secondary' | 'warning' | 'danger' | 'success' | "black";
}

const Spinner: React.FC<Props> = ({
  size = "sm",
  variant = "secondary",
  className = "",
}) => {
  return (
    <div
      className={clsx(
        {
          "border-brand-900 border-t-white": variant === "primary",
          "border-gray-500 border-t-white": variant === "secondary",
          "border-emerald-900/90 border-t-emerald-300": variant === "success",
          "border-yellow-500/25 border-t-yellow-400": variant === "warning",
          "border-red-500/25 border-t-red-500": variant === "danger",

          "h-4 w-4 border-[2px]": size === "xs",
          "h-5 w-5 border-2": size === "sm",
          "h-8 w-8 border-[3px]": size === "md",
          "h-10 w-10 border-2": size === "lg",
        },
        "rounded-full animate-spin ease-in-out ",
        className
      )}
    />
  );
};

export default Spinner;
