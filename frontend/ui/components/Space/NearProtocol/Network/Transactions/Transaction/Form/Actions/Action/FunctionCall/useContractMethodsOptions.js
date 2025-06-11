import { useStoreEffect, useStoreEntity } from '@react-vault';
import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useLoader } from '@hooks/useLoader.js';
import { useDebounce } from '@hooks/useDebounce.js';
import { base64ToArrayBuffer } from '../../../../../../../../../../../store/helpers/base64ToArrayBuffer.js';
import { getExportedWasmFunctions } from '../../../../../../../../../../../store/helpers/getExportedWasmFunctions.js';

const loadWasmAndGetFunctions = async (contractWasm, rpc, contractId, networkId, spaceId) => {
  if (contractWasm === 'existContract') {
    await rpc.configure({ spaceId, networkId });
    const { codeBase64 } = await rpc.getContractWasm({ contractId });
    contractWasm = codeBase64;
  }

  const arrayBuffer = base64ToArrayBuffer(contractWasm);
  return getExportedWasmFunctions(arrayBuffer);
};

export const useContractMethodsOptions = (form, getName, order) => {
  const { control } = form;
  const { spaceId, networkId } = useParams();
  const [options, setOptions] = useState([]);
  const rpc = useStoreEntity((store) => store.nearProtocol.rpcProvider);
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
    if (!contractId) return setOptions([]);

    (async () => {
      try {
        if (!contractWasm) {
          setOptions([]);
          return;
        }

        const exportedFunctions = await loadWasmAndGetFunctions(
          contractWasm,
          rpc,
          contractId,
          networkId,
          spaceId,
        );
        setOptions(exportedFunctions.map((fn) => ({ value: fn.name, label: fn.name })));
      } catch (e) {
        console.log(e);
        setOptions([]);
      }
    })();
  }, [contractId, contractWasm]);

  return options;
};
