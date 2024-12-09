import { presets } from '../../../../../../../../../store/slices/nearProtocol/slices/networks/presets.js';

const getFilteredRpcs = (rpcList, rpcType, networkId) => {
  const existingRpcs = new Set(rpcList[rpcType].map(({ id }) => id));
  return presets[networkId].rpcList[rpcType].filter((rpc) => !existingRpcs.has(rpc.id));
};

export const getAvailablePredefinedRpcs = (network) => {
  const { networkId, rpcList } = network;

  if (!presets[networkId])  // we have presets for mainnet and testnet only
    return {
      hasAvailablePredefinedRpcs: false,
    };

  const regularRpcs = getFilteredRpcs(rpcList, 'regular', networkId);
  const archivalRpcs = getFilteredRpcs(rpcList, 'archival', networkId);

  return {
    hasAvailablePredefinedRpcs: regularRpcs.length > 0 || archivalRpcs.length > 0,
    availablePredefinedRpcs: {
      regular: regularRpcs,
      archival: archivalRpcs,
    },
  };
};
