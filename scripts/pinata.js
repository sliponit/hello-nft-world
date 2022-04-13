import fetch from 'node-fetch'

const body = i => JSON.stringify({
  pinataMetadata: { name: 'SCC #' + i },
  pinataContent: {
    name: 'SCC #' + i,
    description: 'A collection of 40 Sleepy Cartoon Characters',
    image: 'https://nft-api.sliponit9471.workers.dev/svg/' + i
  }
})

const config = {
  method: 'post',
  headers: {
    'Authorization': 'Bearer ' + process.env.PINATA_JWT,
    'Content-Type': 'application/json'
  }
}

const post = i => fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', { ...config, body: body(i) })
  .then(response => response.json())
  .catch(function (error) {
    console.log(error);
  });

const main = async (start, end) => {
  const voir = [];
  for (let i = start; i < end; i++) {
    const res = await post(i)
    voir.push(res.IpfsHash)
    console.log(i, res.IpfsHash)
  }
  console.log(voir)
}

main (0, 40)
