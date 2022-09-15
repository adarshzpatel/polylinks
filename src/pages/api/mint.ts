import { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import {
  POLYLINK_ABI,
  POLYLINK_CONTRACT_ADDRESS,
} from "smart-contract/contract";
import { storeToIpfs } from "src/lib/nftStorage";
import { chain } from "wagmi";
import { Blob } from "nft.storage";
import axios from "axios";
import { createNewProfileDataRow } from "src/lib/tableland";
import { TbX } from "react-icons/tb";

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
    if (name === "") throw new Error("Invalid Input");
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

    // create profile data row in tableland table

    // Generate & upload to ipfs/filecoin Dynamic Image for nft using
    console.log('Generating & uploading nft image')
    const imageDataURL = await axios
      .get("/api/generate-image/" + name)
      .then((res) => res.data.dataURL);
    const imageBlob = new Blob([imageDataURL]);
    const imageCid = await storeToIpfs(imageBlob);
    console.log('Generating & uploading nft image successful')


    console.log('Generating & uploading metadata')

    const metadata = {
      name: name,
      image: imageCid || "",
      external_url: "polylink.vercel.app",
      description: "Professionally showcase all your links in one place",
    };

    // upload metadata to ipfs
    const metadataBlob = new Blob([JSON.stringify(metadata)]);
    const metadataCid = await storeToIpfs(metadataBlob);
    const metadataUri = "ipfs://" + metadataCid;
    console.log('Generating & uploading metadata successfull')

    // Mint the link nft from smart contract
    console.log('Minting nft')

    const mintTx = await nftContract.safeMint(claimAddress, name, metadataUri);
    await mintTx.wait();
    console.log('Mint successfull')

    console.log(mintTx);
    const id = 0;
    console.log("Creating empty profile data")
    await createNewProfileDataRow({
      username: name,
      tokenId: 0,
      owner: claimAddress,
    });
    console.log('Tableland row created')
    
    res.send(mintTx);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}
