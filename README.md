# Property Title Token Project

### Udacity Blockchain Capstone

## Instructions

**Install project dependencies**  
Run npm install

**Compile all contracts**  
cd eth-contracts
truffle compile --all
truffle migrate --reset

(when migrating to the Rinkeby testnet do the following:)
truffle migrate --reset --network rinkeby

**Run all tests**  
cd eth-contracts
truffle test

**Run a test for a specific contract**  
cd eth-contracts
truffle test test/TestERC721Mintable.js

**Package versions**  
Truffle v5.1.27 (core: 5.1.27)  
Solidity v0.5.16 (solc-js)  
Node v10.15.2  
Web3.js v1.2.1

### Zokrates proof used in contract tests

**Validy proofs**  
zokrates/output_files/zokrates/proof.json  
zokrates/output_files_2/proof.json

**Invalidy proof**  
zokrates/output_files/zokrates/inc_proof.json

### Deploy SolnSquareVerifier contract to Rinkeby network

**Contract address:**
https://rinkeby.etherscan.io/address/0x0A6988a48B36d00a08ED7F3D54a056287f7C2788

### Generate OpenSea marketplace

Creating Address: 0x7a29058ae6706ee8646b96ba7d4924465e60498e

https://testnets.opensea.io/Capstone_Real_Estate

### Purchase 5 tokens using a different address

Purchasing Address: 0xfb5b24142979232948f4b562403db06f73f0f577

Token IDs: 100, 101, 102, 103, 104

# Project Resources

- [Remix - Solidity IDE](https://remix.ethereum.org/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Truffle Framework](https://truffleframework.com/)
- [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
- [Open Zeppelin ](https://openzeppelin.org/)
- [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
- [Docker](https://docs.docker.com/install/)
- [ZoKrates](https://github.com/Zokrates/ZoKrates)
