import clsx from "clsx";
import React from "react";

type Props = {
  className?: string;
  children: React.ReactNode;
};

const Card = (props: Props) => {
  return (
    <div
      className={clsx(
        "bg-gray-800 border border-gray-700 rounded-xl",
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

export default Card;
