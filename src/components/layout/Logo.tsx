import React from "react";
import { TbUnlink } from "react-icons/tb";
type Props = {};

const Logo = (props: Props) => {
  return (
    <div className="flex items-center cursor-pointer group gap-2 group">
      <TbUnlink className="h-8 w-8 text-brand-500 group-hover:scale-125  duration-300 ease-out group-hover:-rotate-12" />
      <h1 className="text-2xl font-medium group-hover:text-gray-100 font-sora">PolyLink</h1>
    </div>
  );
};

export default Logo;
