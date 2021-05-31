// migrating the appropriate contracts
//var SquareVerifier = artifacts.require("./SquareVerifier.sol");
//var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
var ERC721Mintable = artifacts.require("ERC721Token");
var SquareVerifier = artifacts.require("Verifier");
var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");

module.exports = function(deployer) {
  
  deployer.deploy(ERC721Mintable);

  deployer.deploy(SquareVerifier).then(() => {
      return deployer.deploy(SolnSquareVerifier, SquareVerifier.address);
  });

};
