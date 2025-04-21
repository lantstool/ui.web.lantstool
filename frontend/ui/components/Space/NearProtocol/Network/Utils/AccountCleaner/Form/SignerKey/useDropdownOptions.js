import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';

const getOptions = (arr) =>
  arr
    .filter((key) => key.isLocalExists)
    .map((key) => ({
      value: key.publicKey,
      label: key.publicKey,
    }));

const createOptionsFromKeys = (fullAccess) => [
  {
    label: 'Full Access',
    options: getOptions(fullAccess),
  },
];

export const useDropdownOptions = (control, signerKey) => {
  const { spaceId, networkId } = useParams();
  const [options, setOptions] = useState([]);
  const getAccountKeys = useStoreEffect((store) => store.nearProtocol.accounts.getAccountKeys);
  const accountId = useWatch({ control, name: 'signerId.value' });

  useEffect(() => {
    (async () => {
      try {
        if (!accountId) return setOptions([]);
        const { fullAccess } = await getAccountKeys({ spaceId, networkId, accountId });
        setOptions(createOptionsFromKeys(fullAccess));
      } catch (e) {
        setOptions([]);
      }
    })();
  }, [accountId, signerKey]);

  return options;
};
