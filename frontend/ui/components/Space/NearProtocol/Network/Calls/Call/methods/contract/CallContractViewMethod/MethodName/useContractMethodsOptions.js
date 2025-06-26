import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import { useLoader } from '@hooks/useLoader.js';

const getFunctions = (contractFunctions, setReadFunctions) => {
  const { isAbiSupported, functions, readFunctions } = contractFunctions;
  if (!isAbiSupported) {
    setReadFunctions(functions);
    return functions.map((methodName) => ({ methodName }));
  }
  setReadFunctions(readFunctions);

  return Object.entries(readFunctions).map(([methodName, fn]) => ({
    methodName,
    modifiers: fn.modifiers || [],
  }));
};

export const useContractMethodsOptions = (control, name) => {
  const { spaceId, networkId } = useParams();
  const [options, setOptions] = useState([]);
  const [readFunctions, setReadFunctions] = useState({});
  const contractId = useWatch({ control, name });
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
    const rawFunctions = getFunctions(contractFunctions, setReadFunctions);

    const methodOptions = rawFunctions.map((fn) => ({
      value: fn.methodName,
      label: fn.methodName,
      modifiers: fn.modifiers,
    }));

    setOptions(methodOptions);
  }, [isLoading, contractFunctions, contractId]);

  return [options, readFunctions];
};
