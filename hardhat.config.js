require("@nomiclabs/hardhat-waffle");
const ICE_PRIVATE_KEY = "your private key";
module.exports = {
  solidity: "0.8.2",
  networks: {
    testnet: {
      url: `http://frost-rpc.icenetwork.io:9933`,
      accounts: ['0x8292ec25ab3cf791678cc5b830147c99cde1ea116f9627088b975c1bbb7c9aef']
    }
  }
};
