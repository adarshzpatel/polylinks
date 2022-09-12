// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PolyLink is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    mapping(string => address) public namesToOwners; //  
    mapping(uint256 => string) tokenIdToName;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("PolyLink", "POLY") {}

    function safeMint(address to, string memory name,string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        namesToOwners[name] = to;
        tokenIdToName[tokenId] = name;
        _setTokenURI(tokenId, uri);
    }

    // Add custom transfer functions
    function transferFrom(address from,address to,uint256 tokenId) public override(ERC721) {
        safeTransferFrom(from, to, tokenId);
        namesToOwners[tokenIdToName[tokenId]] = to;
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}