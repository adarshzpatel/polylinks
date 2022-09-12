import { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import {
  POLYLINK_ABI,
  POLYLINK_CONTRACT_ADDRESS,
} from "smart-contract/contract";
import { storeToIpfs } from "src/lib/nftStorage";
import { chain } from "wagmi";
import {Blob} from 'nft.storage'
/*
 api route : /mint
 description : mint new link 
 req data : { name , claimAddress } 
 res : tokenId
*/

/*
    1. Get Claim Price (Optional) 
    2. Transfer amount to our account 
    3. Generate Metadata
    4. Upload metadata to ipfs through nft.storage  
    5. Mint nft from 
    6. return tokenId 
    */

export default async function mintLink(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("Inside server");
    const { claimAddress, name } = req.body;
    if(name === '') throw new Error("Invalid Input")
    const privateKey = process.env.PRIVATE_KEY || "";
    const provider = new ethers.providers.AlchemyProvider(
    chain.polygonMumbai.id,
      process.env.ALCHEMY_API_KEY
    );
    const signer = new ethers.Wallet(privateKey, provider);

    const nftContract = new ethers.Contract(
      POLYLINK_CONTRACT_ADDRESS,
      POLYLINK_ABI,
      signer
    );

    const metadata = {
      name:name,
      image: "",
      external_url: "polylink.vercel.app",
      description: "Professionally showcase all your links in one place",
    };

    const metadataBlob = new Blob([JSON.stringify(metadata)]);
    const metadataCid = await storeToIpfs(metadataBlob);
    console.log(metadataCid)
    const metadataUri = "ipfs://" + metadataCid;
    const mintTx = await nftContract.safeMint(claimAddress, name, metadataUri);
    await mintTx.wait();
    console.log(mintTx);
    // res.json(mintTx.toJSON());
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}
