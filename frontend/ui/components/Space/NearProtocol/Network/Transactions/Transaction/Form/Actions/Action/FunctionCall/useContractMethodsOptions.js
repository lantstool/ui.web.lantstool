import { useStoreEffect, useStoreEntity } from '@react-vault';
import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useLoader } from '@hooks/useLoader.js';

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

const loadWasmAndGetOptions = async (base64, rpc, contractId, networkId, spaceId) => {
  if (base64 === 'accountContract') {
    await rpc.configure({ spaceId, networkId });
    const { codeBase64 } = await rpc.getContractWasm({ contractId });
    base64 = codeBase64;
  }
  const arrayBuffer = base64ToArrayBuffer(base64);
  return getExportedWasmFunctions(arrayBuffer);
};

export const useContractMethodsOptions = (form, name, hasCreateAccount, order) => {
  const { control } = form;
  const { spaceId, networkId } = useParams();
  const [options, setOptions] = useState([]);
  const rpc = useStoreEntity((store) => store.nearProtocol.rpcProvider);
  const contractId = useWatch({ control, name });
  const actions = useWatch({ control, name: 'actions' });
  const getActionsWithWasm = useStoreEffect(
    (store) => store.nearProtocol.transactions.getActionsWithWasm,
  );

  const [isLoading, contractWasm] = useLoader(
    getActionsWithWasm,
    { actions, hasCreateAccount, order },
    [contractId, JSON.stringify(actions)],
  );

  useEffect(() => {
    if (!contractId) return;

    (async () => {
      try {
        if (!contractWasm) {
          setOptions([]);
          return;
        }

        const options = await loadWasmAndGetOptions(
          contractWasm,
          rpc,
          contractId,
          networkId,
          spaceId,
        );
        setOptions(options.map((fn) => ({ value: fn.name, label: fn.name })));
      } catch (e) {
        console.error(e);
        setOptions([]);
      }
    })();
  }, [contractId, JSON.stringify(actions), isLoading, contractWasm]);

  return options;
};
