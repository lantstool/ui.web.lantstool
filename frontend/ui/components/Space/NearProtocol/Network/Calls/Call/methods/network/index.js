import { getNodeStatus } from './getNodeStatus/index.js';
import { getNetworkInfo } from './getNetworkInfo/index.js';
import { getGasPrice } from './getGasPrice/index.js';

export const network = {
  getNodeStatus,
  getNetworkInfo,
  getGasPrice,
};
