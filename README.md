# Sleepy Cartoon Characters

Submission for https://nft.replit.com/ hackathon

## Directory
- api -> cloudflare worker 
- app -> react app hosted on https://sleepy-cartoon-characters.pages.dev/
- smart-contract -> solidity for https://rinkeby.etherscan.io/address/0xbf3c7e598211f33b765f304521959173bb77f6da 
- scripts 
  - init.js to initialize small DB on cloudflare KV
  - pinata.js to create ipfs files
  - cron.js backend script updating data every minute (should be moved in api for consistency)

## Known limitation
- Offer acceptation in WETH not taken into account

## Credits
- https://freesvg.org/cartoon-mouth-and-eyes for art elements