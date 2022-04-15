// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

// We need to import the helper functions from the contract that we copy/pasted.
import { Base64 } from "./libraries/Base64.sol";

contract MyEpicNFT is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  uint public constant MAX_SUPPLY = 50;
  
  address payable public owner;

  event NewEpicNFTMinted(address sender, uint256 tokenId);

  constructor() payable ERC721 ("Sleepy Cartoon Characters", "SCC")  {
    owner = payable(msg.sender);
    console.log("This is my NFT contract. Woah!");
  }

  function makeAnEpicNFT(string calldata cid) public payable  {
    require(balanceOf(msg.sender) == 0, 'Each address may only own one SCC');
    require(msg.value >= 0.1 ether, "Not enough ETH sent: check price.");

    uint256 newItemId = _tokenIds.current();

    require(newItemId < MAX_SUPPLY, "Not enough NFTs left!");
		
    console.log("Registering %s.%s on the contract with tokenID %d", newItemId);
    string memory finalTokenUri = string(abi.encodePacked("ipfs://", cid));
  
    console.log("\n--------------------------------------------------------");
	  console.log("Final tokenURI", finalTokenUri);
	  console.log("--------------------------------------------------------\n");

    _safeMint(msg.sender, newItemId); // Update your URI!!!
    _setTokenURI(newItemId, finalTokenUri);
  
    _tokenIds.increment();
    console.log("An NFT w/ ID %s has been minted to %s", newItemId, msg.sender);
    emit NewEpicNFTMinted(msg.sender, newItemId);
  }

  function getTotalNFTsMintedSoFar () public view returns (uint256) {
    return _tokenIds.current();
  }

  modifier onlyOwner() {
    require(isOwner());
    _;
  }

  function isOwner() public view returns (bool) {
    return msg.sender == owner;
  }

  function withdraw() public onlyOwner {
    uint amount = address(this).balance;
    
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success, "Failed to withdraw");
  } 
}