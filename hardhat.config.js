require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    localhost: {
      url: "http://127.0.0.1:7545",
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
