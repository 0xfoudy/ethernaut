// hardhat.config.js
require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-web3");
//const { alchemyGoerli, privateKey, alchemyMain } = require('./secrets.json');
module.exports = {
  solidity: "0.8.0",
    networks: {
 //     goerli: {
  //      url: alchemyGoerli,
   //     accounts: [privateKey]
  //    },
  //    mainnet:{
  //      url: alchemyMain,
   //     accounts: [privateKey]
 //     }
    }
};
