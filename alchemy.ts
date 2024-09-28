import { Network, Alchemy } from "alchemy-sdk";
import type { AlchemyConfig } from "alchemy-sdk";

const defaultSettings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network:
    process.env.network &&
    Object.values(Network).includes(process.env.network as Network)
      ? (process.env.network as Network)
      : Network.ETH_MAINNET,
};

const createAlchemyInstance = (config?: AlchemyConfig): Alchemy =>
  new Alchemy(config || defaultSettings);

export default createAlchemyInstance;
