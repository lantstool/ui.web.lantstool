import { action } from '../../../../../../../react-vault/index.js';

export const setNetworks = action(({ slice, payload: networks }) => {
  slice.list = [];
  slice.map = {};

  networks.forEach((network) => {
    slice.list.push(network.networkId);
    slice.map[network.networkId] = network;
  });
});
