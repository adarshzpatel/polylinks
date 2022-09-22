import { MoralistNftResponse } from "types/nft";
import Link from "next/link";
import Button from "@components/ui/Button";
import { POLYLINK_CONTRACT_ADDRESS } from "smart-contract/contract";
import { FiExternalLink, FiLink } from "react-icons/fi";

type Props = {
  tokenData: MoralistNftResponse;
};

const LinkNftCard = ({ tokenData }: Props) => {
  const metadata = JSON.parse(tokenData.metadata);
  if (metadata?.name === "") return <></>;
  return (
    <div className="bg-gray-800/75 w-full hover:shadow-xl  p-4 rounded-lg  hover:ring-1  ring-gray-600 hover:ring-brand-400 hover:bg-brand-900/20 flex items-center justify-between gap-2 duration-200 ease-out hover:text-brand-300 ">
      <p className="text-xl font-bold ml-2">/ {metadata?.name}</p>
      <div className="space-x-3">
        <Link href={`/edit/${tokenData?.token_id}`}>
          <Button variant="success">Edit</Button>
        </Link>
        <Link href={"/" + metadata?.name}>
          <Button variant="primary">View </Button>
        </Link>
        <Link
          href={`https://testnets.opensea.io/assets/mumbai/${POLYLINK_CONTRACT_ADDRESS}/${tokenData?.token_id}`}
        >
          <Button >
            View On OpenSea 
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LinkNftCard;
