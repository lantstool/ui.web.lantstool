import { useNetworkId } from '@hooks/useNetworkId.js';
import { useStoreEffect, useStoreState } from '@react-vault';
import { useManageRouting } from './useManageRouting.js';
import { useLoader } from '@hooks/useLoader.js';
import { Form } from './Form/Form.jsx';
import { OperationProgress } from './OperationProgress/OperationProgress.jsx';

export const AccountCleaner = () => {
  const { networkId, spaceId } = useNetworkId();
  const isAvailableNetwork = networkId === 'mainnet' || 'testnet';
  const accountCleaner = useStoreState(
    (store) => store.nearProtocol.utils.accountCleaner?.[spaceId]?.[networkId],
    [spaceId, networkId],
  );
  const onMount = useStoreEffect((store) => store.nearProtocol.utils.accountCleaner.onMount);

  useManageRouting(isAvailableNetwork);
  useLoader(onMount, { spaceId, networkId }, [spaceId, networkId]);

  if (!isAvailableNetwork || !accountCleaner) return null;

  if (accountCleaner.step === 'form')
    return (
      <Form defaultValues={accountCleaner.formValues} spaceId={spaceId} networkId={networkId} />
    );

  if (accountCleaner.step === 'operation-progress')
    return (
      <OperationProgress
        spaceId={spaceId}
        networkId={networkId}
        operationProgress={accountCleaner.operationProgress}
      />
    );
};
