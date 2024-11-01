import { useStoreEffect } from '@react-vault';
import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const base64ToArrayBuffer = (base64String) => {
  const binaryString = window.atob(base64String);
  const bytes = Uint8Array.from({ length: binaryString.length }, (_, i) =>
    binaryString.charCodeAt(i),
  );
  return bytes.buffer;
};

const getExportedWasmFunctions = async (arrayBuffer) => {
  const module = await WebAssembly.compile(arrayBuffer);
  const exports = WebAssembly.Module.exports(module);
  return exports.filter((exp) => exp.kind === 'function');
};

export const useDropdownOptions = (control) => {
  const { spaceId, networkId } = useParams();
  const [options, setOptions] = useState([]);
  const createRpc = useStoreEffect((store) => store.nearProtocol.createRpc);
  const contractId = useWatch({ control, name: 'params.contractId.value' });

  useEffect(() => {
    if (!contractId) return;
    (async () => {
      try {
        const rpc = await createRpc({ spaceId, networkId });
        const { codeBase64 } = await rpc.contract.viewCode({ contractId });

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
