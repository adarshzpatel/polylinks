import React from "react";
import Link, { LinkProps } from "next/link";

type Props = {
  children: React.ReactNode;
} & LinkProps;

const StyledLink = ({ children, ...props }: Props) => {
  return (
    <Link {...props}>
      <a className="underline underline-offset-[8px] decoration-zinc-600 hover:decoration-zinc-400 italic font-medium text-zinc-300 hover:text-white duration-300 ease-out font-sora mx-1"> {children} </a>
    </Link>
  );
};

export default StyledLink;
