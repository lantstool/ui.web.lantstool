import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';


//We search contractId before CreateContract  action
//because we don't want to Fetch getContractFunctions if we have BLOCKERS.
const getContractIdBeforeBlockers = (actions) => {
  const firstFnIdx = actions.findIndex((a) => a.type === 'FunctionCall');
  if (firstFnIdx === -1) return null;

  const contractId = actions.find((action) => action?.type === 'FunctionCall')?.contractId?.value;
  const hasCreateAccount = actions.find((action) => action?.type === 'CreateAccount')

  return hasCreateAccount ? null : contractId;
};


export const useLoadContractFunctions = (control) => {
  const [isLoading, setLoading] = useState(true);
  const [functions, setFunctions] = useState(null);
  const actions = useWatch({ control, name: 'actions' });
  const { spaceId, networkId } = useParams();
  const getContractFunctions = useStoreEffect(
    (store) => store.nearProtocol.contractsMethods.getContractFunctions,
  );

  const contractId = getContractIdBeforeBlockers(actions);

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
