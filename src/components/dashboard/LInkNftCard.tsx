import React from "react";
import { EvmNft } from "@moralisweb3/evm-utils";
import { MoralistNftResponse } from "types/nft";
import Link from "next/link";
import Card from "@components/ui/Card";
import Button from "@components/ui/Button";

type Props = {
  tokenData: MoralistNftResponse;
};

const LinkNftCard = ({ tokenData }: Props) => {
  const metadata = JSON.parse(tokenData.metadata);
  if (metadata.name === "") return <></>;
  return (
    <div className="bg-gray-800/75 w-full hover:shadow-xl  p-4 rounded-lg  hover:ring-1  ring-gray-600 hover:ring-brand-400 hover:bg-brand-900/20 flex items-center justify-between gap-2 duration-200 ease-out hover:text-brand-300 ">
      <p className="text-xl font-bold ml-2">/ {metadata.name}</p>
      <div className="space-x-3">
        <Link href={`/${metadata.name}/edit`}>
          <Button variant="success">Edit</Button>
        </Link>
        <Link href={"/" + metadata.name}>
          <Button variant="primary">View </Button>
        </Link>
        <Button className="!bg-sky-500 saturate-[0.8] !hover:bg-sky-600 !active:bg-sky-600 !text-white">
          Transfer
        </Button>
      </div>
    </div>
  );
};

export default LinkNftCard;
