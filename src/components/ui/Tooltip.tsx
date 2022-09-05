import Tippy, { TippyProps } from "@tippyjs/react";
import React, { JSXElementConstructor, ReactElement, ReactNode } from "react";
import "tippy.js/animations/scale.css";

type Props = {
  className?: string;
  content: ReactNode | string;
  children: ReactElement<any, string | JSXElementConstructor<any>> | undefined;
} & TippyProps;

const Tooltip = ({ content, children, className = "", ...rest }: Props) => {
  return (
    <Tippy
      placement="bottom"
      animation="scale"
      arrow={true}
      className={
        "shadow-2xl backdrop-blur-xl font-mono backdrop-brightness-50 px-2 py-0.5 ring-1 bg-brand-900/30 rounded-lg ring-brand-400" +
        className
      }
      {...rest}
      content={content}
    >
      {children}
    </Tippy>
  );
};

export default Tooltip;
