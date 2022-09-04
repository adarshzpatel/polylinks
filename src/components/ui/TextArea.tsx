import clsx from "clsx";
import { DetailedHTMLProps, forwardRef, TextareaHTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  label?: string;
  className?: string;
  error?: string;
  id?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(function Input(
  { label, error = "", className = "", ...props },
  ref
) {
  return (
    <div>
      <label className="w-full  ">
        {label && (
          <div className="mb-2 font-sora font-medium text-gray-200">
            {label}
          </div>
        )}
        <div
          className={clsx(
            "flex group items-center focus-within:border-brand-500 focus-within:shadow-lg hover:shadow-xl active:border-brand-500 hover:bg-gray-600/10 border border-gray-500  duration-300  rounded-md p-4",
            {
              "border-red-500 hover:border-red-500 focus-within:border-red-500 active:border-red-500":
                error !== "",
            }
          )}
        >
          <textarea
            className={clsx(
              "flex-1 bg-transparent focus:outline-none text-gray-100",
              className
            )}
            id={props.id}
            ref={ref}
            {...props}
          />
        </div>
        {error !== "" && <div className="mt-1 text-red-600">{error}</div>}
      </label>
    </div>
  );
});
