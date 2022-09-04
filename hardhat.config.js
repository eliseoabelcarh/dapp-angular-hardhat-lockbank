require("@nomicfoundation/hardhat-toolbox");
require('@openzeppelin/hardhat-upgrades');
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY]
    }
  }, 
  etherscan: {
    apiKey:{
      ropsten: process.env.ETHERSCAN_API_KEY,
    }
  },
  paths: {
    artifacts: "./web3/artifacts",
    tests: "./web3/tests",
    cache: "./web3/cache",
    sources: "./web3/contracts",
    scripts: "./web3/scripts",
  }
};
