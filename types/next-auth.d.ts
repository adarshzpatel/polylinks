import NextAuth, { ISODateString } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string | undefined;
    };
    expires: ISODateString;
    address: string | undefined;
  }
}
