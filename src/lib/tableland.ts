import { connect, resultsToObjects } from "@tableland/sdk";
import { providers, Signer, Wallet } from "ethers";
import { ProfileDataSchema } from "types/nft";

const TABLE_NAME = "polylinks_80001_2003";

type CreateNewRowProps = {
  username: string;
  owner: string;
  tokenId: number;
  signer?: Signer;
};

export const createNewTable = async () => {
  const tableland = await connect({
    chain: "polygon-mumbai",
    network: "testnet",
  });

  await tableland.siwe();

  const { name } = await tableland.create(
    `owner text, tokenid int unique, username text unique, displayname text, bio text, socials any, links any`,
    { prefix: "polylinks" }
  );
  console.log(name);
};
// Run on server side api only
export const createNewProfileDataRow = async ({
  username,
  owner,
  tokenId,
  signer,
}: CreateNewRowProps) => {
  try {
    // TABLELAND CONNECTION
    const tableland = await connect({
      chain: "polygon-mumbai",
      network: "testnet",
      signer
    });

    // INSERT QUERY
    const writeRes = await tableland.write(`
      INSERT INTO ${TABLE_NAME} 
      (owner , tokenId, username, displayName, bio, socials, links) 
      VALUES ('${owner}',${tokenId},'${username}', '', '', null, null)`);

    console.log("Row created successfuly  ");
    console.log(writeRes);
    return writeRes;
  } catch (err) {
    console.error(err);
  }
};

export const updateProfileData = async (
  data: Omit<ProfileDataSchema, "username"> , signer:Signer
) => {
  try {
    const tableland = await connect({
      chain: "polygon-mumbai",
      network: "testnet",
      signer
    });

    const query = `UPDATE ${TABLE_NAME} SET owner = '${data.owner}', displayname = '${data.displayname}', bio = '${data.bio}', socials = '${data.socials}', links = '${data.links}' WHERE tokenid = ${data.tokenid}`;
    const writeRes = await tableland.write(query);
    console.log(writeRes);
    return writeRes;
  } catch (err) {
    console.error(err);
  }
};

export const getProfileDataByUsername = async (username: string) => {
  try {
    const tableland = await connect({
      chain: "polygon-mumbai",
      network: "testnet",
    });

    const profileData = await tableland.read(
      `SELECT * FROM ${TABLE_NAME} WHERE username = '${username}'`
    );
    if (profileData.rows.length > 0) return resultsToObjects(profileData)[0];
    return null;
  } catch (err) {
    throw new Error("Error updating getting profile data");
  }
};

export const getProfileDataById = async (id: string) => {
  try {
    const tableland = await connect({
      chain: "polygon-mumbai",
      network: "testnet",
    });

    const profileData = await tableland.read(
      `SELECT * FROM ${TABLE_NAME} WHERE tokenid = ${id}`
    );
    if (profileData.rows.length > 0) return resultsToObjects(profileData)[0];
    return null;
  } catch (err) {
    console.log(err);
  }
};
