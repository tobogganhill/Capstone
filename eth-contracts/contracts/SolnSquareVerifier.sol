pragma solidity >=0.4.21 <0.6.0;
pragma experimental ABIEncoderV2;

import "./ERC721Mintable.sol";

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is ERC721Token {

    /********************************************************************************************/
    /*                                       DATA VARIABLES                                     */
    /********************************************************************************************/

    // TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
    Verifier verifier;

    // TODO define a solutions struct that can hold an index & an address
    struct Solutions {
        address addr;
        uint256 index;
        bytes32 hashKey;
    }

    // TODO define an array of the above struct
    Solutions[] solutions;

    // TODO define a mapping to store unique solutions submitted
    mapping(uint256 => Solutions) private submittedSolutions;

    // Mapping to keep track of tokens by address
    mapping (address => uint256[]) private ownedTokens;

    uint256 solutionId;


    /********************************************************************************************/
    /*                                       EVENT DEFINITIONS                                  */
    /********************************************************************************************/

    // TODO Create an event to emit when a solution is added
    event Submit(address from, uint256 tokenId, uint256 index);

    // event to emit when a solution is not unique
    event Rejected(string str);

    // event to emit when a solution is not unique
    event Approved(string str);


    constructor(address zokratesContract) public {
        verifier = Verifier(zokratesContract);
        solutionId = 0;
    }


    /********************************************************************************************/
    /*                                       UTILITY FUNCTIONS                                  */
    /********************************************************************************************/


    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution
    (
        address to, 
        uint256 tokenId,
        uint[2] memory a, 
        uint[2][2] memory b, 
        uint[2] memory c,     
        uint[1] memory input
    ) 
    public 
    returns (bool)
    {

        
        if (checkSolution(a, b, c, input) && verifier.verifyTx(a, b, c, input)) {

            // Add token to an address owner
            ownedTokens[to].push(tokenId);

            // Used in the checkSolution function to make sure the solution is unique
            solutions.push(Solutions({
                addr: to,
                index: solutionId++,
                hashKey: keccak256(abi.encodePacked(a, b, c, input))
            }));

            submittedSolutions[tokenId] = Solutions({
                addr: to,
                index: solutionId++,
                hashKey: keccak256(abi.encodePacked(a, b, c, input))
            });

            emit Submit(to, tokenId, solutionId);

            return true;

        }

        return false;

    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    function mintNFT
        (
            uint256 tokenId,
            uint[2] memory a, 
            uint[2][2] memory b, 
            uint[2] memory c, 
            uint[1] memory input
        ) 
            public returns (bool) {
            
            // set token owner
            address to = msg.sender;

            //require(_exists(tokenId), "Token already minted");

            if (addSolution(to, tokenId, a, b, c, input)) {
                
                super.mint(to, tokenId);

                return true;

            }

            return false; 

    }

    function checkSolution
    (
        uint[2] memory a, 
        uint[2][2] memory b, 
        uint[2] memory c, 
        uint[1] memory input
    ) 
    internal
    returns (bool) 
    {
        for(uint s=0; s<solutions.length; s++) {
            if (solutions[s].hashKey == keccak256(abi.encodePacked(a, b, c, input))) {
                emit Rejected("Solution already exist.");
                return false;
            }
        }
        emit Approved("Solution verified.");
        return true;
    }


    function solution(uint256 tokenId) public view returns (Solutions memory) {
        return submittedSolutions[tokenId];
    }
    

    function tokens(address owner) public view returns (uint256[] memory) {
        return ownedTokens[owner];
    }


}

contract Verifier {
    function verifyTx(uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[1] memory input) public returns (bool r);
}




  


























