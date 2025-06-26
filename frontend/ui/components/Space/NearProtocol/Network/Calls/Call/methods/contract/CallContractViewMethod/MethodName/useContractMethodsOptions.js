import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import { useLoader } from '@hooks/useLoader.js';

const getOptionsAndArgsTemplates = (contractFunctions) => {
  if (!contractFunctions) return { options: [], argsTemplates: {} };

  const { isAbiSupported, functions, readFunctions } = contractFunctions;

  if (isAbiSupported) {
    const options = Object.entries(readFunctions).map(([key, value]) => ({
      value: key,
      label: key,
      modifiers: value.modifiers,
    }));
    return { options, argsTemplates: readFunctions };
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

export const useContractMethodsOptions = (control) => {
  const { spaceId, networkId } = useParams();
  const [options, setOptions] = useState([]);
  const [argsTemplates, setArgsTemplates] = useState({});
  const contractId = useWatch({ control, name: 'contractId.value' });
  const getContractFunctions = useStoreEffect(
    (store) => store.nearProtocol.contractsMethods.getContractFunctions,
  );

  const [isLoading, contractFunctions] = useLoader(
    getContractFunctions,
    { spaceId, networkId, contractId },
    [spaceId, networkId, contractId],
  );

  useEffect(() => {
    if (isLoading) return;
    const { options, argsTemplates } = getOptionsAndArgsTemplates(contractFunctions);

    setOptions(options);
    setArgsTemplates(argsTemplates);
  }, [contractFunctions]);

  return { options, argsTemplates };
};
