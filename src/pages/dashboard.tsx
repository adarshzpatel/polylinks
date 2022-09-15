import React, { useEffect, useState } from "react";
import AppContainer from "@components/layout/AppContainer";
import Heading from "@components/ui/Heading";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Moralis from "moralis";
import { POLYLINK_CONTRACT_ADDRESS } from "smart-contract/contract";
import { EvmChain, EvmNft } from "@moralisweb3/evm-utils";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { MoralistNftResponse } from "types/nft";
import LinkNftCard from "@components/dashboard/LInkNftCard";

type Props = {
  nftsOwned: MoralistNftResponse[] | undefined;
  isAuthenticated: boolean;
};

const DashboardPage = ({ nftsOwned, isAuthenticated }: Props) => {
  const { openConnectModal } = useConnectModal();

  // if the user is not authenticated , open the connect modal
  useEffect(() => {
    if (isAuthenticated && openConnectModal) {
      openConnectModal();
    }
  }, [openConnectModal, isAuthenticated]);

  if (!isAuthenticated) {
    return <AppContainer>Please connect your wallet !</AppContainer>;
  }

  if (!nftsOwned) {
    return <AppContainer>You do not own any polylink nfts</AppContainer>;
  }

  return (
    <AppContainer>
      <Heading className="mb-8">Dashboard</Heading>
      <h6 className="mb-4 text-xl uppercase font-bold text-gray-400">
        Link Nfts Owned
      </h6>
      <div className="flex flex-col gap-8">
        {nftsOwned?.map((item) => (
          <LinkNftCard key={item?.token_id} tokenData={item} />
        ))}
      </div>
    </AppContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  if (session) {
    console.log(session.user);
    const nftApiResponse = await Moralis.EvmApi.nft.getWalletNFTs({
      address: session?.user?.address,
      tokenAddresses: [POLYLINK_CONTRACT_ADDRESS],
      chain: EvmChain.MUMBAI,
    });

    return {
      props: {
        isAuthenticated: session ? true : false,
        nftsOwned: nftApiResponse.raw.result,
      },
    };
  }

  return {
    props: {
      isAuthenticated: session ? true : false,
      nftsOwned: {},
    },
  };
};

export default DashboardPage;
