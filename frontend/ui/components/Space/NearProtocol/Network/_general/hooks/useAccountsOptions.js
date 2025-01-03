import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';

export const useAccountsOptions = (deps) => {
  const { spaceId, networkId } = useParams();
  const [options, setOptions] = useState([]);
  const getIds = useStoreEffect((store) => store.nearProtocol.accounts.getIds);

  useEffect(() => {
    (async () => {
      try {
        const accounts = await getIds({ spaceId, networkId });
        const options = accounts.map((accountId) => ({
          value: accountId,
          label: accountId,
        }));
        setOptions(options);
      } catch (e) {
        setOptions([]);
      }
    })();
  }, [deps]);

  return options;
};
