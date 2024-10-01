import { useMemo } from 'react';
import { useStoreState } from '../../../../../react-vault/index.js';

export const useGetOptions = (spaceId, networkId) => {
  const ids = useStoreState((store) => store.nearProtocol.networks.ids);

  return useMemo(
    () =>
      ids.map((networkId) => (
        <option value={networkId} key={networkId}>
          {networkId}
        </option>
      )),
    [ids, spaceId, networkId],
  );
};
