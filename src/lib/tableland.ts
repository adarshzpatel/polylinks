import { connect } from "@tableland/sdk";
import { Signer } from "ethers";
import { ProfileDataSchema } from "types/nft";

const TABLE_NAME = "polylinks_80001_2519";

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
    `owner text, tokenid int unique, username text unique, displayname text, bio text, coveruri text, socials any, links any`,
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
      signer,
    });
 
    // INSERT QUERY
    const writeRes = await tableland.write(`
      INSERT INTO ${TABLE_NAME} 
      (owner , tokenId, username, displayName, bio, coveruri, socials, links) 
      VALUES ('${owner}',${tokenId},'${username}', 'Example Display Name', 'Tell your story here', 'https://images.unsplash.com/photo-1662869633285-13fe05236a72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1460&q=80' , null, null)`);

    console.log("Row created successfuly  ");
    console.log(writeRes);
    return writeRes;
  } catch (err) {
    console.error(err);
  }
};

export const updateProfileData = async (
  data: Omit<ProfileDataSchema, "username">,
  signer: Signer
) => {
  try {
    const tableland = await connect({
      chain: "polygon-mumbai",
      network: "testnet",
      signer,
    });

    const query = `UPDATE ${TABLE_NAME} SET owner = '${data.owner}', displayname = '${data.displayname}', bio = '${data.bio}', coveruri = '${data.coveruri}', socials = '${data.socials}', links = '${data.links}' WHERE tokenid = ${data.tokenid}`;
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

    if (profileData) {
      //@ts-ignore
      return profileData[0];
    }
    return null;
  } catch (err) {
    console.error(err);
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
    if (profileData) {
      //@ts-ignore
      return profileData[0];
    }
    return null;
  } catch (err) {
    console.error(err);
  }
};

export const getMyTable = async () => {
  try {
    const tableland = await connect({
      chain: "polygon-mumbai",
      network: "testnet",
    });

    const tableData = await tableland.read(`SELECT * FROM ${TABLE_NAME}`);
    console.log(tableData);
    return null;
  } catch (err) {
    console.error(err);
  }
};
