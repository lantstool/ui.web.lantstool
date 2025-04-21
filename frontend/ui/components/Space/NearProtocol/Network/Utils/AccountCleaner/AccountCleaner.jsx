import { useNetworkId } from '@hooks/useNetworkId.js';
import { useStoreEffect, useStoreState } from '@react-vault';
import { useManageRouting } from './useManageRouting.js';
import { useLoader } from '@hooks/useLoader.js';
import { Form } from './Form/Form.jsx';

export const AccountCleaner = () => {
  const { isMainnet, networkId, spaceId } = useNetworkId();

  const accountCleaner = useStoreState(
    (store) => store.nearProtocol.utils.accountCleaner?.[spaceId]?.[networkId],
    [spaceId, networkId],
  );
  const onMountAccountCleaner = useStoreEffect(
    (store) => store.nearProtocol.utils.onMountAccountCleaner,
  );

  useManageRouting(isMainnet);
  useLoader(onMountAccountCleaner, { spaceId, networkId }, [spaceId, networkId]);

  if (!isMainnet || !accountCleaner) return null;

  if (accountCleaner.step === 'filling-form')
    return (
      <Form defaultValues={accountCleaner.formValues} spaceId={spaceId} networkId={networkId} />
    );
};
