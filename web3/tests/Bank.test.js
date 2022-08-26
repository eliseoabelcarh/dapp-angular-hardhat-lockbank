const { expect } = require("chai");


describe('Bank App', () => {

    let bank, token, owner, address_1, address_2
    let addresses
  
    beforeEach(async () => {
        const BankContract = await ethers.getContractFactory('Bank');
        bank = await BankContract.deploy();
        await bank.deployed();
  
        const TokenContract = await ethers.getContractFactory('Token');
        token = await TokenContract.deploy(bank.address);
        await token.deployed();
  
        [owner, address_1, address_2, ...addresses] = await ethers.getSigners();
    })
  
    describe('Deployment', () => {
        it('should have totalSupply of 0', async () => {
            expect(await bank.totalSupply()).to.equal("0");
        })
        it('Adresses should have 0 tokens and 0 deposit', async () => {
            expect(await bank.accounts(owner.address)).to.equal("0");
            expect(await token.balanceOf(owner.address)).to.equal("0");
            expect(await bank.accounts(address_1.address)).to.equal("0");
            expect(await token.balanceOf(address_1.address)).to.equal("0");
            expect(await bank.accounts(address_2.address)).to.equal("0");
            expect(await token.balanceOf(address_2.address)).to.equal("0");
        })
    })

    describe('Deposit', () => {
        const oneCoin = ethers.utils.parseEther("1.0");
        it('Owner deposit 1 coin', async () => {
            await bank.connect(owner).deposit({value: oneCoin});
            expect(await bank.accounts(owner.address)).to.equal(oneCoin);
            expect(await bank.totalSupply()).to.equal(oneCoin);
        })
        it('account_1 deposit 1 coin, withdraw 1 coin, then have 1 reward token', async () => {
            await bank.connect(address_1).deposit({value: oneCoin});
            expect(await bank.accounts(address_1.address)).to.equal(oneCoin);
            await bank.connect(address_1).withdraw(oneCoin,token.address);
            expect(await bank.accounts(address_1.address)).to.equal("0");
            expect(await token.balanceOf(address_1.address)).to.equal(oneCoin);
        })
        it('account_2 deposit 1 coin, withdraw 1 coin, then have 1 reward token', async () => {
            await bank.connect(address_2).deposit({value: oneCoin});
            expect(await bank.accounts(address_2.address)).to.equal(oneCoin);
            await bank.connect(address_2).withdraw(oneCoin,token.address);
            expect(await bank.accounts(address_2.address)).to.equal("0");
            expect(await token.balanceOf(address_2.address)).to.equal(oneCoin);
        })
        it('should fail when trying withdrawn money you havent deposited', async () => {
            await expect(bank.connect(address_2).withdraw(oneCoin,token.address)).to.be.revertedWith("You do not have enough funds to withdraw");
        })
    })
  
  });