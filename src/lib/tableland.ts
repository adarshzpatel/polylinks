import { connect } from "@tableland/sdk";
import { ProfileDataSchema } from "types/nft";

const TABLE_NAME = "polylinks_80001_1934";

type CreateNewRowProps = {
  username: string;
  owner: string;
  tokenId: number;
};
export const createNewProfileDataRow = async ({
  username,
  owner,
  tokenId,
}: CreateNewRowProps) => {
  try {
    // TABLELAND CONNECTION
    const tableland = await connect({
      chain: "polygon-mumbai",
      network: "testnet",
    });

    // INSERT QUERY
    const writeRes = await tableland.write(`
      INSERT INTO ${TABLE_NAME} 
      (owner , tokenId, username, displayName, bio, socials, links) 
      VALUES 
      (${owner},${tokenId},${username}, '', '', '', '')`);

    console.log("Row created successfuly  ");
    console.log(writeRes);
    return writeRes;
  } catch (err) {
    throw new Error("Error creating a new profile data row");
  }
};

export const updateProfileData = async () => {
  try {
    const tableland = await connect({
      chain: "polygon-mumbai",
      network: "testnet",
    });
    await tableland.siwe();

    const writeRes = await tableland.write(`UPDATE ${TABLE_NAME} SET `);
    console.log(writeRes);
    return writeRes;
  } catch (err) {
    console.log(err);
    throw new Error("Error updating profile data");
  }
};

export const getProfileData = async (username: string) => {
  try {
    const tableland = await connect({
      chain: "polygon-mumbai",
      network: "testnet",
    });

    const profileData = await tableland.read(
      `SELECT * FROM ${TABLE_NAME} WHERE ID = ${username}`
    );
  } catch (err) {
    throw new Error("Error updating getting profile data");
  }
};
