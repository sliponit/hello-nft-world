const main = async () => {
  const [owner, superCoder] = await hre.ethers.getSigners();
  const nftContractFactory = await hre.ethers.getContractFactory('MyEpicNFT');
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);
  console.log("Contract owner:", owner.address);

  // Call the function.
  let txn = await nftContract.makeAnEpicNFT("QmNc5wgNWjtdGJdm7vpmUiaLp9mag3sUPgZnBXQxrECVoA", { value: hre.ethers.utils.parseEther('1234') })
  // Wait for it to be mined.
  await txn.wait()

  // Mint another NFT for fun.
  txn = await nftContract.makeAnEpicNFT("QmNc5wgNWjtdGJdm7vpmUiaLp9mag3sUPgZnBXQxrECVoA", { value: hre.ethers.utils.parseEther('1234') })
  await txn.wait()

  const total = await nftContract.getTotalNFTsMintedSoFar()
  const minters = await nftContract.getAllMinters()
  console.log(`Minted ${total} NFTs, minters ${minters}`)
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
