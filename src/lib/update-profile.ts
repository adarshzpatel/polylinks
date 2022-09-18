import axios from "axios";
import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";
import { Blob } from "nft.storage";
import { chain } from "wagmi";
import { storeToIpfs } from "./nftStorage";
import { updateProfileData } from "./tableland";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const newData = req.body.data;
    const coverImage: File | null = newData.coverImage;
    let coverImageURI = "";

    // If cover image is available then upload it to nft.storage and retrieve the uri
    if (coverImage) {
      const coverImageBlob = new Blob([coverImage]);
      const coverImageCid = await storeToIpfs(coverImageBlob);
      coverImageURI = "ipfs://" + coverImageCid;
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
  
    res.status(200).json({ resultHash });
  } catch (err) {
    res.status(500).json(err);
  }
}
