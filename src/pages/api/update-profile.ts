import axios from "axios";
import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";
import { Blob } from "nft.storage";
import { chain } from "wagmi";
import { storeToIpfs } from "../../lib/nftStorage";
import { updateProfileData } from "../../lib/tableland";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const newData = req.body.data;
    const coverImage: File | null = newData.coverImage;
    let coverImageURI = "";
    console.log(typeof newData.coverURI)
    // If cover image is available then upload it to nft.storage and retrieve the uri
    if (coverImage !== null) {
      const coverImageBlob = new Blob([coverImage])
      const coverImageCid = await storeToIpfs(coverImageBlob);
      console.log(coverImageCid)
      coverImageURI = "ipfs://" + coverImageCid;
      console.log("Cover Image Updated");
    }
    
    const privateKey = process.env.PRIVATE_KEY || "";
    const provider = new ethers.providers.AlchemyProvider(
      chain.polygonMumbai.id,
      process.env.ALCHEMY_API_KEY
    );
    const signer = new ethers.Wallet(privateKey, provider);

    const resultHash = await updateProfileData(
      { ...newData, coverimage: coverImageURI },
      signer
    );
      console.log("Updated successfulluy")
    res.status(200).json({ resultHash });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
}
