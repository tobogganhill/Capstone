var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
var Verifier = artifacts.require('Verifier');
var proof = require("../../zokrates/output_files/zokrates/proof.json");
var proof_2 = require("../../zokrates/output_files_2/proof.json");
var inc_proof = require("../../zokrates/output_files/zokrates/inc_proof.json");


contract('SolnSquareVerifier', accounts => {

    const account_one = accounts[0];


    describe('zokrates', async function () {
        
        
        before(async function () { 
            let verifier = await Verifier.new();    
            let solnSquareVerifier = await SolnSquareVerifier.new(verifier.address);
            this.contract = solnSquareVerifier;
        })

        
        // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
        it('should mint an ERC721', async function () { 
            
            let verify = await this.contract.mintNFT(100, proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs, {from: account_one});

            let owner = await this.contract.ownerOf(100);

            let list = await this.contract.tokens(account_one);

            let sol = await this.contract.solution(100);

            let solution = verify.logs[0].event;
            let event = verify.logs[2].event;
            
            // Test if a new solution can be added for contract - SolnSquareVerifier
            // Assert if a new solution was added
            assert.equal(solution, "Approved", "Should emit an approved event");
            
            assert.equal(event, "Transfer", "Should emit a transfer event");

            assert.equal(owner, account_one, "Owner should be account_one");
            
        })


        it('should fail mint using same proof', async function () { 

            // Try to mint different token with same proof
            let verify = await this.contract.mintNFT(101, proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs, {from: account_one});

            let event = verify.logs[0].event;
            
            assert.equal(event, "Rejected", "Should emit a rejected event");
            
        })


        it('should fail mint same token with a valid proof', async function () { 

            let error;
            
            try {
                await this.contract.mintNFT(100, proof_2.proof.a, proof_2.proof.b, proof_2.proof.c, proof_2.inputs, {from: account_one});
            } catch(e) {
                error = e.reason;
            }

            
            assert.equal(error, "ERC721: token already minted", "Should return token already minted");
            
        })


        
        it('contract should have only one token', async function () { 

            let total = await this.contract.totalSupply();
            
            assert.equal(total.toString(), "1", "Should return 1 token only");
            
        })



        it('should have 2 tokens for address', async function () { 

            await this.contract.mintNFT(101, proof_2.proof.a, proof_2.proof.b, proof_2.proof.c, proof_2.inputs, {from: account_one});

            let list = await this.contract.tokens(account_one);
            let size = list.length;
            
            assert.equal(size, 2, "Should return 2 tokens for the address aaccount");
            
        })

        
        it('contract should have two tokens now', async function () { 

            let total = await this.contract.totalSupply();
            
            assert.equal(total.toString(), "2", "Should return 1 token only");
            
        })



    });


})

