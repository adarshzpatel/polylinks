import React from "react";
import { FiExternalLink } from "react-icons/fi";
import { LinkType } from "types/nft";

const LinkCard = ({ title, url }: LinkType) => {
  return (
    <div className="w-full">
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="bg-gray-800/75 hover:shadow-xl py-2 px-4 rounded-lg  hover:ring-1  ring-gray-600 hover:ring-brand-400 hover:bg-brand-900/20 flex items-center justify-between gap-2 duration-300 ease-out hover:text-brand-300 "
      >
        {title} <FiExternalLink />
      </a>
    </div>
  );
};

export default LinkCard;
