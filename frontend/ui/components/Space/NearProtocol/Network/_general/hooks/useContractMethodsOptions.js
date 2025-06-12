import { useStoreEntity } from '@react-vault';
import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { base64ToArrayBuffer } from '../../../../../../../store/helpers/base64ToArrayBuffer.js';
import { getExportedWasmFunctions } from '../../../../../../../store/helpers/getExportedWasmFunctions.js';

export const useContractMethodsOptions = (control, name) => {
  const { spaceId, networkId } = useParams();
  const [options, setOptions] = useState([]);
  const rpc = useStoreEntity((store) => store.nearProtocol.rpcProvider);
  const contractId = useWatch({ control, name });

  useEffect(() => {
    if (!contractId) return;
    (async () => {
      try {
        await rpc.configure({ spaceId, networkId });
        const { codeBase64 } = await rpc.getContractWasm({ contractId });

        const arrayBuffer = base64ToArrayBuffer(codeBase64);
        const exportedFunctions = await getExportedWasmFunctions(arrayBuffer);

        const options = exportedFunctions.map((fn) => ({
          value: fn.name,
          label: fn.name,
        }));

        setOptions(options);
      } catch (e) {
        console.log(e.message);
        setOptions([]);
      }
    })();
  }, [contractId]);

  return options;
};
