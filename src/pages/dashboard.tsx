import Heading from "@components/ui/Heading";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Moralis from "moralis";
import { POLYLINK_CONTRACT_ADDRESS } from "smart-contract/contract";
import { EvmChain, EvmNft } from "@moralisweb3/evm-utils";
import { MoralistNftResponse } from "types/nft";
import LinkNftCard from "@components/dashboard/LInkNftCard";

type Props = {
  nftsOwned: MoralistNftResponse[] | undefined;
  isAuthenticated: boolean;
};

const DashboardPage = ({ nftsOwned, isAuthenticated }: Props) => {
  // if the user is not authenticated , open the connect modal

  if (!isAuthenticated) {
    return <div>Please connect your wallet !</div>;
  }

  return (
    <>
      <Heading className="mb-8">Dashboard</Heading>
      <h6 className="mb-4 text-xl uppercase font-bold text-gray-400">
        Link Nfts Owned
      </h6>
      <div className="flex flex-col gap-8">
        {nftsOwned?.map((item) => (
          <LinkNftCard key={item?.token_id} tokenData={item} />
        ))}
        {nftsOwned?.length === 0 && "You do not own any nft"}
      </div>
      
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
  if (session) {
    const nftApiResponse = await Moralis.EvmApi.nft.getWalletNFTs({
      address: session?.address,
      tokenAddresses: [POLYLINK_CONTRACT_ADDRESS],
      chain: EvmChain.MUMBAI,
    });

    console.log(nftApiResponse.raw.result);
    return {
      props: {
        isAuthenticated: true,
        nftsOwned: nftApiResponse.raw.result || [],
      },
    };
  }

  return {
    props: {
      isAuthenticated: session ? true : false,
      nftsOwned: [],
    },
  };
};

export default DashboardPage;
