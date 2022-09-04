// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fs = require("fs");
const { ethers, upgrades } = require("hardhat");


async function main() {



  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  // const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  // const lockedAmount = hre.ethers.utils.parseEther("1");

  // const Lock = await hre.ethers.getContractFactory("Lock");
  // const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  // await lock.deployed();

  // console.log(
  //   `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  // );




  const BankContract = await hre.ethers.getContractFactory('Bank');
  bank = await BankContract.deploy();
  await bank.deployed();
  console.log('Bank deployed to:', bank.address);

  const TokenContract = await hre.ethers.getContractFactory('Token');
  token = await TokenContract.deploy(bank.address);
  await token.deployed();
  console.log('Token deployed to:', token.address);


  // * Create enviroment file with the smart contract addresses
  let addresses = {"bankContract": bank.address, "tokenContract": token.address};
  let addressesJSON = JSON.stringify(addresses);
  fs.writeFileSync("web3/enviroment/contract-addresses.json", addressesJSON);


  
  // const CalculatorV1 = await ethers.getContractFactory("CalculatorV1");
  // calculator = await upgrades.deployProxy(CalculatorV1, [42], {initializer: "initialize"});
  // await calculator.deployed();
  // console.log("Calculator deployed to:", calculator.address);
  
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
