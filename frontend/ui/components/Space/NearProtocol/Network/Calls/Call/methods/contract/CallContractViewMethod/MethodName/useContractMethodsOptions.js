import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import { useLoader } from '@hooks/useLoader.js';

export const useContractMethodsOptions = (control, name, functionsType) => {
  const { spaceId, networkId, callId } = useParams();
  const [options, setOptions] = useState([]);
  const contractId = useWatch({ control, name });
  const addContract = useStoreEffect((store) => store.nearProtocol.contractAbi.addContract);

  const [isLoading, functions] = useLoader(
    addContract,
    { spaceId, networkId, contractId, functionsType: 'read' },
    [spaceId, networkId, contractId, callId],
  );

  useEffect(() => {
    if (isLoading || !functions) return;

    const methodOptions = functions.map((fn) => ({
      value: fn,
      label: fn,
    }));

    setOptions(methodOptions);
  }, [isLoading, functions, contractId]);

  return options;
};
