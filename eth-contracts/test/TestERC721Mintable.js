
var ERC721MintableComplete = artifacts.require('ERC721Token');
var BigNumber = require('bignumber.js');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];
    const account_four = accounts[3];
    const account_five = accounts[4];
    const account_six = accounts[5];


    describe('match erc721 spec', function () {
        before(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});

            // TODO: mint multiple tokens

            this.contract.mint(account_two, 1, {from: account_one});
            this.contract.mint(account_three, 2, {from: account_one});
            this.contract.mint(account_four, 3, {from: account_one});
            this.contract.mint(account_five, 4, {from: account_one});
            this.contract.mint(account_six, 5, {from: account_one});
            this.contract.mint(account_six, 6, {from: account_one});
        })

        it('should return total supply', async function () { 

            let total = await this.contract.totalSupply();
            assert.equal(total.toString(), "6", "Should have 6 tokens");
            
        })

        it('should get token balance', async function () { 

            let balance = await this.contract.balanceOf(account_two);
            let balance4 = await this.contract.balanceOf(account_six);

            assert.equal(balance.toString(), "1", "Should have 1 token");
            assert.equal(balance4.toString(), "2", "Should have 2 tokens");
            
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let uri = await this.contract.tokenURI(1);
            assert.equal(uri, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", "Token uri should be complete");            
        })

        it('should transfer token from one owner to another', async function () { 
  
            await this.contract.transferFrom(account_five, account_six, 4, {from: account_five});

            let new_owner = await this.contract.ownerOf(4);
            let balance6 = await this.contract.balanceOf(account_six);

            assert.equal(balance6.toString(), "3", "Should have 3 tokens now");
            assert.equal(new_owner, account_six, "Should return new token owner");

        })


    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            
            let message;

            try {
                await this.contract.mint(account_six, 7, {from: account_six});
            } catch(e) {
                message = e.reason;
            }
            
            assert.equal(message, "Caller is not contract owner", "Should return the error from onlyOwner modifier")
        })

        it('should return contract owner', async function () { 
            let owner = await this.contract.owner();
            assert.equal(owner, account_one, "should return contract owner");
        })

    });
})