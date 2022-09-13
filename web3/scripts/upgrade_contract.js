const { ethers, upgrades } = require("hardhat");

//Read json file with deployed contract addresses
let json = require('../../.openzeppelin/ropsten.json')
//the address of the implementation contract
let key = Object.keys(json.impls)[0]
let implementationContractAddress = json.impls[key].address
//the address of the deployed proxy
const PROXY = json.proxies[0].address
console.log("PROXY",PROXY)

//PROXIES [{
//     "address": "0xdD84Db8B88c3241328448F5C2af61D7F6C11fFa8",
//     "txHash": "0x55a5a8f2f7e96018dd64c1e46e619b0ccc9c53ce984715e8dd7812fbda0abdbc",
//     "kind": "transparent"
//   }
// ],
// "impls": {
//   "883381539d0f39fa2db42dc13b5feab5d3e69f0acd180adcc2205ac6bb0b5bb8": {
//     "address": "0x0C5AD284F4A1999C10f4aBF29CDB3F86A629509b",
//     "txHash": "0xf49d0d686938b9b977f58e5feef0947c78af863a9a027930df438235e2e62de0",

async function main() {
    // const CalculatorV2 = await ethers.getContractFactory("CalculatorV2");
    // console.log("Upgrading Calculator v2...");
    // await upgrades.upgradeProxy(PROXY, CalculatorV2);
    // console.log("Calculator upgraded");
    const CalculatorV3 = await ethers.getContractFactory("CalculatorV3");
    console.log("Upgrading Calculator v3...");
    await upgrades.upgradeProxy(PROXY, CalculatorV3);
    console.log("Calculator upgraded");
}

main();
