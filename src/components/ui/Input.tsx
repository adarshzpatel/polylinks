import clsx from "clsx";
import React, {
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
} from "react";

export interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  className?: string;
  error?: string;
  pre?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, type = "text", error = "", className = "", pre, ...props },
  ref
) {
  return (
    <div>
      <label>
        {label && (
          <div className="mb-2 font-sora font-medium text-gray-200">
            {label}
          </div>
        )}
        <div
          className={`flex group  items-center  focus-within:border-brand-500 hover:shadow-xl focus-within:shadow-lg hover:bg-gray-600/10 active:border-brand-500 border border-gray-500 hover:border-brand-500 duration-300  rounded-md ${
            !pre && "px-4 py-2"
          } ${
            error != "" &&
            "border-red-500 focus-within:border-red-500 active:border-red-500"
          }`}
        >
          {pre && (
            <div className="flex items-center justify-center text-gray-500 group-focus-within:bg-brand-700/20  group-focus-within:text-brand-400 group-focus-within:border-brand-500 bg-gray-700/50  h-10 w-10 border-r border-gray-500 ">
              {pre}
            </div>
          )}
          <input
            autoComplete="off"
            className={clsx(
              {
                "px-4 py-2": pre,
              },
              "flex-1 bg-transparent focus:outline-none text-gray-100 placeholder:text-gray-500",
              className
            )}
            type={type}
            ref={ref}
            {...props}
          />
        </div>
        {error !== "" && <div className="mt-1 text-red-600">{error}</div>}
      </label>
    </div>
  );
});
