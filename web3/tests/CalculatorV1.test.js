const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe('Calculator', () => {

    // let paymentGateway, escrow, owner, address_1, address_2
    // let addresses
    let calculator

    beforeEach(async () => {

        [owner, address_1, address_2, ...addresses] = await ethers.getSigners();

        const CalculatorV1 = await ethers.getContractFactory("CalculatorV1");
        calculator = await upgrades.deployProxy(CalculatorV1, [42], {initializer: "initialize"});
        await calculator.deployed();
        console.log("Calculator deployed to:", calculator.address);

    })

    describe('Calculator Functions', () => {
        const oneCoin = ethers.utils.parseEther("1.0");
        it('Get initial value', async () => {
            expect(await calculator.getVal()).to.equal(42);
        })
    })

})