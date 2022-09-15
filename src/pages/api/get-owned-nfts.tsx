import Moralis from 'moralis'
import { NextApiRequest, NextApiResponse } from 'next'
import {EvmChain} from '@moralisweb3/evm-utils'
import React from 'react'
import { POLYLINK_CONTRACT_ADDRESS } from 'smart-contract/contract'

type Props = {}

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
  const address = "0xAF1cB165fC9e95769292f6af8b106395f346bb77"

  await Moralis.start({apiKey:process.env.MORALIS_API_KEY})

  const nftResponse = await Moralis.EvmApi.nft.getWalletNFTs({
    address:address,
    chain: EvmChain.MUMBAI,
    tokenAddresses:[POLYLINK_CONTRACT_ADDRESS]
  })

  const result = nftResponse.result;
  console.log(result);
  res.json(result)
}