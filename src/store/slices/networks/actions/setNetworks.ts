import { action } from '../../../../react-vault';

export const setNetworks = action(({ slice, payload: networks }: any) => {
  slice.list = [];
  slice.map = {};

  networks.forEach((network: any) => {
    slice.list.push(network.networkId);
    slice.map[network.networkId] = network;
  });
});
