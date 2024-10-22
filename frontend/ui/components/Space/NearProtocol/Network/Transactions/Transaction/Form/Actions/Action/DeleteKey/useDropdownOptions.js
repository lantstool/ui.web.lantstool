import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';

const getOptions = (arr) =>
  arr
    .map((key) => ({
      value: key.publicKey,
      label: key.publicKey,
      permission: key.accessKey.permission,
    }));

const createOptionsFromKeys = ({ fullAccess, functionCall }) => [
  {
    label: 'Full Access',
    options: getOptions(fullAccess),
  },
  {
    label: 'Functional Call',
    options: getOptions(functionCall),
  },
];

export const useDropdownOptions = (control) => {
  const { spaceId, networkId } = useParams();
  const [options, setOptions] = useState([]);
  const getAccountKeys = useStoreEffect((store) => store.nearProtocol.accounts.getAccountKeys);
  const accountId = useWatch({ control, name: 'signerId' });

  useEffect(() => {
    (async () => {
      try {
        if (!accountId) return setOptions([]);
        const keys = await getAccountKeys({ spaceId, networkId, accountId });
        setOptions(createOptionsFromKeys(keys));
      } catch (e) {
        setOptions([]);
      }
    })();
  }, [accountId]);

  return options;
};
