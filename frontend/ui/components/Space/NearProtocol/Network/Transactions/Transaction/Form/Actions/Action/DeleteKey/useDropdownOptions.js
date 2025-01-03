import { useEffect, useMemo, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';

/**
 * Fetch all account keys and filter already selected
 */

const getOptions = (arr, selectedKeys) =>
  arr
    .filter(({ publicKey }) => !selectedKeys.has(publicKey))
    .map((key) => ({
      value: key.publicKey,
      label: key.publicKey,
      permission: key.accessKey.permission,
    }));

const createOptionsFromKeys = (keys, selectedKeys) => [
  {
    label: 'Full Access',
    options: getOptions(keys.fullAccess, selectedKeys),
  },
  {
    label: 'Functional Call',
    options: getOptions(keys.functionCall, selectedKeys),
  },
];

export const useDropdownOptions = (control) => {
  const { spaceId, networkId } = useParams();
  const [options, setOptions] = useState([]);
  const getAccountKeys = useStoreEffect((store) => store.nearProtocol.accounts.getAccountKeys);
  const accountId = useWatch({ control, name: 'signerId.value' });
  const actions = useWatch({ control, name: 'actions' });

  const selectedKeys = useMemo(
    () =>
      new Set(
        actions
          .filter(({ type, accessKey }) => type === 'DeleteKey' && accessKey?.value)
          .map(({ accessKey }) => accessKey.value),
      ),
    [actions],
  );

  useEffect(() => {
    (async () => {
      try {
        if (!accountId) return setOptions([]);
        const keys = await getAccountKeys({ spaceId, networkId, accountId });
        setOptions(createOptionsFromKeys(keys, selectedKeys));
      } catch (e) {
        setOptions([]);
      }
    })();
  }, [accountId, selectedKeys]);

  return options;
};
