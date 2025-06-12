import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStoreEffect, useStoreEntity } from '@react-vault';
import { useWatch } from 'react-hook-form';
import { useLoader } from '@hooks/useLoader.js';

const checkLastAccessKey = (actions, keys) => {
  const isDeleteAccount = actions.find((action) => action.type === 'DeleteAccount');

  if (keys?.fullAccess?.length === 0 || isDeleteAccount) return false;

  const deleteKeyActions = actions.filter(
    (action) => action.type === 'DeleteKey' && action.publicKey,
  );
  const valueSet = new Set(deleteKeyActions.map((action) => action.publicKey.value));
  return keys.fullAccess.every((item) => valueSet.has(item.publicKey));
};

const isBeneficiary = async (rpc, actions) => {
  const beneficiaryId = actions.find((action) => action.type === 'DeleteAccount')?.beneficiaryId
    ?.value;

  if (!beneficiaryId) return false;
  try {
    const account = await rpc.getAccount({ accountId: beneficiaryId });
    return !account;
  } catch (e) {
    return true;
  }
};

export const useIsExtraConfirmation = (from) => {
  const { control } = from;
  const { spaceId, networkId } = useParams();
  const [isConfirmation, setConfirmation] = useState(null);
  const getAccountKeys = useStoreEffect((store) => store.nearProtocol.accounts.getAccountKeys);
  const rpc = useStoreEntity((store) => store.nearProtocol.rpcProvider);
  const accountId = useWatch({ control, name: 'signerId.value' });
  const actions = useWatch({ control, name: 'actions' });

  const [_, keys] = useLoader(getAccountKeys, { spaceId, networkId, accountId }, [accountId]);

  useEffect(() => {
    (async () => {
      try {
        if (!accountId) return setConfirmation(null);
        const isLastAccessKey = checkLastAccessKey(actions, keys);

        await rpc.configure({ spaceId, networkId });
        const beneficiary = await isBeneficiary(rpc, actions);

        if (beneficiary) {
          return setConfirmation('beneficiaryConfirmation');
        }

        if (isLastAccessKey) {
          return setConfirmation('lastKeyConfirmation');
        } else return setConfirmation(null);
      } catch (e) {
        setConfirmation(null);
      }
    })();
  }, [accountId, actions]);

  return isConfirmation;
};
