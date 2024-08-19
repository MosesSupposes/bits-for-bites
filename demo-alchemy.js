// Github: https://github.com/alchemyplatform/alchemy-sdk-js
const { Network, Alchemy } = require("alchemy-sdk");

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

alchemy.core.getBlockNumber("finalized").then(console.log);
