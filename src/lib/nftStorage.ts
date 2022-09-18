import { NFTStorage, Blob} from "nft.storage";

const token = process.env.NFT_STORAGE_KEY

const client = new NFTStorage({token:token || ''})

export const storeToIpfs = async (data: Blob): Promise<string | undefined> => {
  try {
    const cid = await client.storeBlob(data);
    return cid;
  } catch (err) {
    console.log(err);
    throw Error("Failed to upload file to ipfs")
  }
};
