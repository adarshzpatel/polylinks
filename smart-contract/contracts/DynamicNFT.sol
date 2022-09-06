// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@tableland/evm/contracts/ITablelandTables.sol";

contract DynamicNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    ITablelandTables private _tableland;
    string private _metadataTable;
    string private _tablePrefix = "prolink";
    uint256 private _metadataTableId;

    // Data will be pulled from the network
    string private _baseURIString =
        "https://testnet.tableland.network/query?s=";

    // Called only when the smart contract is created
    constructor(address registry) ERC721("ProLink", "PRL") {
        // Tableland address on your current chain
        _tableland = ITablelandTables(registry);

        // Stores the unique ID for the newly created table
        _metadataTableId = _tableland.createTable(
            address(this),
            string.concat(
                "CREATE TABLE ",
                _tablePrefix,
                "_",
                Strings.toString(block.chainid),
                " (id int,external_link text,username text,displayName text);"
            )
        );
        /*
         *  Stores the full tablename for the new table
         *  {prefix}_{chainId}_{tableid}
         */
        _metadataTable = string.concat(
            _tablePrefix,
            "_",
            Strings.toString(block.chainid),
            "_",
            Strings.toString(_metadataTableId)
        );
    }

    /*
     * @dev safeMint allows anyone to mint a token in this project.
     * Any time a token is minted, a new row of metadata will be
     * dynamically inserted into the metadata table.
     */
    function safeMint(address to) public returns (uint256) {
        uint256 newItemId = _tokenIds.current();

        /* Any table updates will go here */
        _tableland.runSQL(
            address(this),
            _metadataTableId,
            string.concat(
                "INSERT INTO ",
                _metadataTable,
                " (id,external_link,username,displayName) VALUES (",
                Strings.toString(newItemId),
                ", 'https://www.test.com', 'test','testName'"
            )
        );

        _safeMint(to, newItemId, "");
        _tokenIds.increment();
        return newItemId;
    }

    /*
     * @dev updateLinkData allows the owner of the nft to update the details of their profile page
     */
    function updateLinkData(uint256 tokenId, string calldata displayName)
        public
    {
        // Check token ownership
        require(this.ownerOf(tokenId) == msg.sender, "Unauthorized");

        /* Any table updates will go here */
        // update displayName
        _tableland.runSQL(
            address(this),
            _metadataTableId,
            string.concat(
                "UPDATE ",
                _metadataTable,
                " SET displayName = ",
                displayName,
                " WHERE id = ",
                Strings.toString(tokenId),
                ";"
            )
        );
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseURIString;
    }

    /*
     * @dev tokenURI returns a row in your metadata table back into erc721 compliant metadata JSON .
     */
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721URIStorage: URI query for nonexistent token"
        );
        string memory base = _baseURI();

        /*
         * SELECT json_object('id',id,'external_link',external_link,'x',x,'y',y)
         *  as meta FROM canvas_5_4 WHERE id=11
         */
        return
            string.concat(
                base,
                "SELECT%20json_object(%27id%27,id,%27external_link%27,external_link,%27username%27,username,%27displayName%27,displayName)%20as%20meta%20FROM%20",
                _metadataTable,
                "%20WHERE%20id=",
                Strings.toString(tokenId),
                "&mode=list"
            );
    }

    // @dev metadataURI can be used to view the metadata table directly
    function metadataURI() public view returns (string memory) {
        string memory base = _baseURI();
        return
            string.concat(
                base,
                "SELECT%20*%20FROM%20",
                "SELECT%20*%20FROM%20",
                _metadataTable
            );
    }
}
