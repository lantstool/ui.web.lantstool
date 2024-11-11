import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';

const getOptions = (arr) =>
  arr.map((key) => ({
    value: key.publicKey,
    label: key.publicKey,
  }));

const createOptionsFromKeys = ({ fullAccess, functionCall }) => [
  { label: 'Full Access', options: getOptions(fullAccess) },
  { label: 'Functional Call', options: getOptions(functionCall) },
];

export const usePublicKeyOptions = (form, getName) => {
  const { spaceId, networkId } = useParams();
  const [options, setOptions] = useState([]);
  const getAccountKeys = useStoreEffect((store) => store.nearProtocol.accounts.getAccountKeys);

  // Somehow watch of 'accountId.value' doesn't work inside the useFieldArray
  const accountId = useWatch({ control: form.control, name: getName('accountId') });

  useEffect(() => {
    (async () => {
      try {
        if (!accountId?.value) return setOptions([]);
        const keys = await getAccountKeys({ spaceId, networkId, accountId: accountId.value });
        setOptions(createOptionsFromKeys(keys));
      } catch (e) {
        setOptions([]);
      }
    })();
  }, [accountId?.value]);

  return options;
};
