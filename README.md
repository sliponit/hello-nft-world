# Sleepy Cartoon Characters

Submission for https://nft.replit.com/ hackathon
## Value proposition
Create a fun experience to learn not to buy/sell NFTs too fast, i.e. before a good night sleep

## Principle
- A NFT collection of 40 Sleepy Cartoon Characters on the Ethereum blockchain (Rinkeby testnet)
- Each character has a unique sleeping duration between 9 and 48 hours.
- The sleeping duration depends on the traits of the character, e.g. a smiling characters needs less sleep than a sad one. Rare characters have a red element and the longest sleeping need!
- This sleeping duration needs to be respected between buying a NFT and listing it for sale.
- Otherwise the character goes in hibernation between 9 and 48 days!
- When a characters is asleep, it appears with a grey background. When it hibernates, it goes black!
- One mint per wallet. The minter wallet address appears as a watermark on the NFT image.

## Monetization
0.1 ETH per mint

## Directory
- api -> cloudflare worker https://nft-api.sliponit9471.workers.dev
- app -> react app hosted on https://sleepy-cartoon-characters.pages.dev/
- smart-contract -> solidity for https://rinkeby.etherscan.io/address/0xbf3c7e598211f33b765f304521959173bb77f6da 
- scripts 
  - init.js to initialize small DB on cloudflare KV
  - pinata.js to create ipfs files
  - cron.js backend script updating data every minute (should be moved in api for consistency, see https://developers.cloudflare.com/workers/examples/cron-trigger/)

## Known limitations
- Offer acceptation in WETH and transfers not taken into account

## Credits
- https://freesvg.org/cartoon-mouth-and-eyes for art elements
- https://app.buildspace.so/projects/CO77556be5-25e9-49dd-a799-91a2fc29520e for contract and app skeletons
