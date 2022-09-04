import React from "react";
import { FiArrowUpRight } from "react-icons/fi";

type Props = {};

const LinkCard = (props: Props) => {
  return (
    <div>
      <a href="#" target={"_blank"} rel="noreferrer">
        <div className="bg-gray-800 group hover:text-gray-300  hover:ring-2 hover:ring-gray-50/20 duration-300 ease-out gap-4 flex items-center p-2 rounded-lg">
          <div className=" aspect-square  h-12 rounded-md bg-brand-600 p-3">
            <FiArrowUpRight className="h-full w-full  group-hover:rotate-45 duration-300 ease-out" />
          </div>
          <div>
            <p className="font-medium ">Link Title</p>
            <p className="truncate text-gray-500 text-sm underline underline-offset-4">
              Link Url
            </p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default LinkCard;
