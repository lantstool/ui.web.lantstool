import { action } from '../../../../react-vault';

export const setNetworks = action(({ slice, payload }: any) => {
  const { networks } = payload;

  slice.list = [];
  slice.map = {};

  networks.forEach((network: any) => {
    slice.list.push(network.networkId);
    slice.map[network.networkId] = network;
  });
  slice.current = networks[0];
});
