import { useStoreEffect } from '@react-vault';
import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useLoader } from '@hooks/useLoader.js';
import { useDebounce } from '@hooks/useDebounce.js';

const getOptionsAndArgsTemplates = (contractFunctions) => {
  if (!contractFunctions) return { options: [], argsTemplates: {} };

  const { isAbiSupported, functions, writeFunctions } = contractFunctions;

  if (isAbiSupported) {
    const options = Object.entries(writeFunctions).map(([key, value]) => ({
      value: key,
      label: key,
      modifiers: value.modifiers,
    }));
    return { options, argsTemplates: writeFunctions };
  }
  // If ABI is not supported and only WASM functions is present
  const options = functions.map((fnName) => ({
    value: fnName,
    label: fnName,
    modifiers: [],
  }));

  const argsTemplates = functions.reduce((acc, fnName) => {
    acc[fnName] = {
      argsTemplate: '',
    };
    return acc;
  }, {});

  return { options, argsTemplates };
};

export const useContractMethodsOptions = (form, getName, order, loadContractFunctions) => {
  const { control } = form;
  const [isLoading, contractFunctions] = loadContractFunctions
  const [options, setOptions] = useState([]);
  const [argsTemplates, setArgsTemplates] = useState({});
  const contractId = useWatch({ control, name: getName('contractId.value') });
  const actions = useWatch({ control, name: 'actions' });
  const getContractWasm = useStoreEffect(
    (store) => store.nearProtocol.transactions.getContractWasm,
  );

  // Debounce to get current actions for correct update FC with createAccount
  const debouncedActions = useDebounce(actions, 200);

  const [_, contractWasm] = useLoader(getContractWasm, { actions: debouncedActions, order }, [
    JSON.stringify(debouncedActions),
  ]);

  useEffect(() => {
    if (isLoading || !contractId) return;

    if (contractWasm === 'onChainContract') {
      const { options, argsTemplates } = getOptionsAndArgsTemplates(contractFunctions);
      setOptions(options);
      setArgsTemplates(argsTemplates);
    } else {
      const { options, argsTemplates } = getOptionsAndArgsTemplates(contractWasm);
      setOptions(options);
      setArgsTemplates(argsTemplates);
    }
  }, [contractId, contractWasm, actions.length, JSON.stringify(actions), contractFunctions]);

  return { options, argsTemplates };
};
