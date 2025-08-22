// SPDX-License-Identifier: MIT
//0x1D4de18300d2869B50632A5Fc67c1Ddd1A07F4b6 astar testnet 

pragma solidity >=0.8.0;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract HydrogenCrystal is ERC721, Ownable {
    uint256 private _nextTokenId;
    
    // URI quemado como constante
    string public constant METADATA_URI = "https://chocolate-legislative-lamprey-152.mypinata.cloud/ipfs/QmPtsubsHpJsNyM1zsMVUbts1BoH6qhjjfoC1FQ3GZpFt4";

    constructor(address initialOwner)
        ERC721("Hydrogen Crystal", "X-101")
        Ownable(initialOwner)
    {}

    function safeMint(address to) public  returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        return tokenId;
    }

    // Devuelve siempre el mismo URI
    function tokenURI(uint256) public pure override returns (string memory) {
        return METADATA_URI;
    }
}