import { useMemo } from 'react';
import { useStoreState } from '../../../../../react-vault/index.js';

const getOptions = (ids) =>
  ids.map((networkId) => ({
    label: networkId,
    value: networkId,
    networkId,
  }));

export const useNetworkOptions = () => {
  const ids = useStoreState((store) => store.nearProtocol.networks.ids);

  return useMemo(() => {
    const options = getOptions(ids);
    return [...options, { label: 'Manage Networks', value: 'networks', networkId: 'networks' }];
  }, [ids]);
};
