import NextAuth, { ISODateString } from "next-auth";
import {EvmAddressish} from '@moralisweb3/evm-utils'

declare module "next-auth" {
  interface Session {
    user: {
      address:EvmAddressish
      profileId:string 
      expirationTime:ISODateString 
      signature:string 
    },
    expires:ISODateString
  }
}