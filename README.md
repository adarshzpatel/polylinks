# Polylinks - Project Overview

**Project Name** : Polylinks

**Project Track** : Cloning Web2

**Short Description**

- Polylinks is the decentralized alternative to web2 platforms like Linktree .
- Get a cool profile page that you own , and showoff your links . Polylinks utlises technologies polygon, moralis , filecoin , and tableland to do what it does in a decentralized manner .

Use Cases

- Showcase all your important links at one place & get a cool profile page
- Really own your profile link , the link is an nft and you can trade it on secondary markets .
- Receive donations / contributions from other people through your page

Potential Revenue Streams

- Keep a fixed fee when claiming a link
- Royalty when traded on secondary market
- Royalty when a profile gets donations

Technologies Used

- Next.js ( Fullstack React Framework )

- Polygon 
  - This project is deployed on Polygon Mumbai

- Moralis ( suite of web3 apis for blazing fast development )
    - NFT Api to fetch link nfts owned by logged in user
    - web3 Auth api to implement sign in with ethereum

- Filecoin ( nft.storage )
  - Store metadata of nfts ( `src/pages/api/mint.ts` )
  - Store cover picture & nft image. ( `src/pages/api/update-profile.ts` )
  - Location of main reusable function ( `src/lib/nftStorage.ts` )

- Tableland 
  - Used to store dynamic profile data of each nft / user .
  - Location `src/lib/tableland.ts` , `src/pages/api/update-profile.ts` , `src/pages/api/mint.ts` 

Team 

- Adarsh Patel | Full Stack Developer ( [https://twitter.com/adarshzpatel](https://twitter.com/adarshzpatel) )

Important Links

- Github - https://github.com/adarshzpatel/polylinks
- Demo - [https://polylinks.vercel.app/](https://polylinks.vercel.app/)

## How to run on locally 

1. clone the repo
2. `npm install`
3. create `.env.local` file 
4. Add these env vars to .env.local
```
MORALIS_API_KEY=YOUR_MORALIS_API_KEY_HERE
NFT_STORAGE_KEY=YOUR_NFT_STORAGE_KEY_HERE
ALCHEMY_API_KEY=YOUR_ALCHEMY_KEY_HERE
PRIVATE_KEY=YOUR_WALLET_PRIVATE_KEY ( this needs to be of the addres that deployed the nft contract )
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=ANY_SECRET_KEY
APP_DOMAIN=polylinks.vercel.app
```
5. `npm run dev`
