import { getNodeStatus } from './GetNodeStatus/index.js';
import { getNetworkInfo } from './GetNetworkInfo/index.js';
import { getGasPrice } from './GetGasPrice/index.js';

export const network = {
  getNodeStatus,
  getNetworkInfo,
  getGasPrice,
};
