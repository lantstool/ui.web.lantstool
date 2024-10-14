import { useMemo } from 'react';
import { useStoreState } from '../../../../../react-vault/index.js';

const getOptions = (ids) =>
  ids.map((networkId) => ({
    label: networkId,
    value: networkId,
  }));

const getDefaultValue = (options, networkId) =>
  options.find((option) => option.value === networkId);

export const useNetworkOptions = (networkId) => {
  const ids = useStoreState((store) => store.nearProtocol.networks.ids);

  return useMemo(() => {
    const options = getOptions(ids);
    const defaultValue = getDefaultValue(options, networkId);
    return {
      defaultValue,
      options: [...options, { label: 'Manage Networks', value: 'networks' }],
    };
  }, [ids, networkId]);
};
