import NextAuth, { ISODateString } from "next-auth";
import {EvmAddressish} from '@moralisweb3/evm-utils'
import { PathString } from "react-hook-form";

declare module "next-auth" {
  interface Session {
    user: {
      name:string
    },
    expires:ISODateString
    address:PathString
  }
}