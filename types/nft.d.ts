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

export type Socials = {
  twitter?: string;
  github?: string;
  instagram?: sting;
  linkedIn?: string;
  youtube?: string;
  email?: string;
  discord?: string;
};

export type LinkType = {
  title: string;
  url: string;
};

export type NftFormData = {
  displayName: string;
  bio: string;
  socials?:Socials ;
  coverURI: string;
};

export type ProfileData = {
  owner: string;
  tokenId: number;
  username: string;
  displayName: string;
  bio: string;
  socials: Socials;
  links: LinkType[];
  coverURI: string;
};

export type ProfileDataSchema = {
  owner: string;
  tokenid: integer;
  username: string;
  displayname: string;
  bio: string;
  socials: unknown;
  links: unknown;
};
