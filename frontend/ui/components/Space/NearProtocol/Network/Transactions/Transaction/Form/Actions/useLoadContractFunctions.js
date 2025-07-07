import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';

//We search contractId before CreateContract action
//because we don't want to Fetch getContractFunctions if we have CreateContract.
const getContractId = (actions) => {
  const functionCall = actions.find((a) => a.type === 'FunctionCall');
  if (!functionCall) return null;

  const hasCreateAccount = actions.some((action) => action?.type === 'CreateAccount');

  return hasCreateAccount ? null : functionCall.contractId?.value || null;
};

export const useLoadContractFunctions = (control) => {
  const [isLoading, setLoading] = useState(true);
  const [functions, setFunctions] = useState(null);
  const actions = useWatch({ control, name: 'actions' });
  const { spaceId, networkId } = useParams();
  const getContractFunctions = useStoreEffect(
    (store) => store.nearProtocol.contractsMethods.getContractFunctions,
  );

  const contractId = getContractId(actions);

  useEffect(() => {
    if (!contractId) {
      setLoading(false);
      setFunctions(null);
      return;
    }

    setLoading(true);
    (async () => {
      const res = await getContractFunctions({ spaceId, networkId, contractId });
      setFunctions(res);
      setLoading(false);
    })();
  }, [spaceId, networkId, contractId]);

  return [isLoading, functions];
};
