import { ISODateString } from "next-auth";

export type MoralistNftResponse = {
  amount: number;
  block_number: number;
  contractType: string;
  last_metadata_sync: ISODateString;
  last_token_uri_sync: ISODateString;
  metadata: string;
  name: string;
  owner_of: string;
  symbol: string;
  token_address: string;
  token_hash: string;
  token_id: number | string;
  token_uri: string;
};
