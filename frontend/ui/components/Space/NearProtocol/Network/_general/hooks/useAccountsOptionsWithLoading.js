import { useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import { useLoader } from '@hooks/useLoader.js';

export const useAccountsOptionsWithLoading = (deps) => {
  const { spaceId, networkId } = useParams();
  const getIds = useStoreEffect((store) => store.nearProtocol.accounts.getIds);

  const [isLoading, accounts] = useLoader(getIds, { spaceId, networkId }, [
    deps,
    spaceId,
    networkId,
  ]);

  const options =
    accounts?.map((accountId) => ({
      value: accountId,
      label: accountId,
    })) ?? [];

  return { options, isLoading };
};
