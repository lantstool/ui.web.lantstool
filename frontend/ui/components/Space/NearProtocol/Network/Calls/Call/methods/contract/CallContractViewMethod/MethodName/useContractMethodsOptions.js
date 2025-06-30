import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import { useLoader } from '@hooks/useLoader.js';
import { getOptionsAndArgsTemplates } from '../../../../../../_general/helpers/getOptionsAndArgsTemplates.js';

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
    const { options, argsTemplates } = getOptionsAndArgsTemplates(contractFunctions, 'read');

    setOptions(options);
    setArgsTemplates(argsTemplates);
  }, [contractFunctions]);

  return { options, argsTemplates };
};
