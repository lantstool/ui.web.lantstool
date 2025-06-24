import { useStoreState } from '@react-vault';
import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import { useLoader } from '@hooks/useLoader.js';

export const useContractMethodsOptions = (control, name, contractHash, functionsType) => {
  const { spaceId, networkId } = useParams();
  const [options, setOptions] = useState([]);
  const contractId = useWatch({ control, name });
  const addContract = useStoreEffect((store) => store.nearProtocol.contractAbi.addContract);
  const records = useStoreState((state) => state.nearProtocol.contractAbi.records);

  useLoader(addContract, { spaceId, networkId, contractId }, [contractId]);

  useEffect(() => {
    const contract = records[contractHash];
    if (!contract) return setOptions([]);

    const functions = contract.isAbiSupported
      ? Object.keys(
          functionsType === 'read' ? contract.readFunctions || {} : contract.writeFunctions || {},
        )
      : contract.functions || [];

    const methodOptions = functions.map((fn) => ({
      value: fn,
      label: fn,
    }));

    setOptions(methodOptions);
  }, [records, contractHash]);

  return options;
};
