import { useStoreEffect } from '@react-vault';
import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useLoader } from '@hooks/useLoader.js';
import { useDebounce } from '@hooks/useDebounce.js';
import { getOptionsAndArgsTemplates } from '../../../../../../_general/helpers/getOptionsAndArgsTemplates.js';

export const useContractMethodsOptions = (form, getName, order, loadContractFunctions) => {
  const { control } = form;
  const [isLoading, contractFunctions] = loadContractFunctions;
  const [options, setOptions] = useState([]);
  const [argsTemplates, setArgsTemplates] = useState({});
  const contractId = useWatch({ control, name: getName('contractId.value') });
  const actions = useWatch({ control, name: 'actions' });
  const getContractFunctions = useStoreEffect(
    (store) => store.nearProtocol.transactions.getContractFunctions,
  );

  // Debounce to get current actions for correct update FC with createAccount
  const debouncedActions = useDebounce(actions, 200);

  const [_, functions] = useLoader(
    getContractFunctions,
    { actions: debouncedActions, order, contractFunctions },
    [JSON.stringify(debouncedActions), contractFunctions],
  );

  useEffect(() => {
    if (isLoading || !contractId) {
      setOptions([]);
      return setArgsTemplates({});
    }

    const { options, argsTemplates } = getOptionsAndArgsTemplates(functions, 'write');
    setOptions(options);
    setArgsTemplates(argsTemplates);
  }, [contractId, functions, actions.lenght, JSON.stringify(actions), contractFunctions]);

  return { options, argsTemplates };
};
