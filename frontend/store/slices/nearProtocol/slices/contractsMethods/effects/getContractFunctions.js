import { effect } from '@react-vault';
import { base64ToArrayBuffer } from '../../../../../helpers/base64ToArrayBuffer.js';
import { getExportedWasmFunctions } from '../../../../../helpers/getExportedWasmFunctions.js';
import { createContractFnArgsTemplates } from '../helpers/createContractFnArgsTemplates/createContractFnArgsTemplates.js';

const getAbiFnsFromResult = async (abiRequestResult) => {
  if (abiRequestResult.status !== 'fulfilled') return;

  try {
    const { readFunctions, writeFunctions } = await createContractFnArgsTemplates(
      abiRequestResult.value.result,
    );

    return {
      isAbiSupported: true,
      readFunctions,
      writeFunctions,
    };
  } catch (e) {
    console.log(e);
  }
};

const getWasmFnsFromResult = async (wasmRequestResult) => {
  if (wasmRequestResult.status !== 'fulfilled') return;

  try {
    const arrayBuffer = base64ToArrayBuffer(wasmRequestResult.value.codeBase64);
    const exportedFunctions = await getExportedWasmFunctions(arrayBuffer);

    return {
      isAbiSupported: false,
      functions: exportedFunctions.map((fn) => fn.name),
    };
  } catch (e) {
    console.log(e);
  }
};

// The purpose of this function: we want to cache the info about contract functions
// and their args and avoid unneeded requests to the network
export const getContractFunctions = effect(async ({ store, slice, payload }) => {
  const { spaceId, networkId, contractId } = payload;
  if (!contractId) return;

  const [rpc] = store.getEntities((store) => store.nearProtocol.rpcProvider);
  const setFunctions = slice.getActions((slice) => slice.setFunctions);
  const records = slice.getState((slice) => slice.records);

  try {
    await rpc.configure({ spaceId, networkId });
    const { codeHash } = await rpc.getAccount({ accountId: contractId });

    // If the account has no deployed contract - skip
    if (codeHash === '11111111111111111111111111111111') return;
    // If we already has the contract methods with this hash in the state - use cached value
    if (records[codeHash]) return records[codeHash];

    // Fetch ABI and Contact Wasm in parallel
    const [contractWasm, abi] = await Promise.allSettled([
      rpc.getContractWasm({ contractId }),
      rpc.callContractViewMethod({ contractId, methodName: '__contract_abi' }),
    ]);

    // Try to extract functions args from ABI
    const abiFns = await getAbiFnsFromResult(abi);

    if (abiFns) {
      setFunctions({ codeHash, functions: abiFns });
      return abiFns;
    }

    // If we can't parse abi - try to extract functions from wasm
    const wasmFns = await getWasmFnsFromResult(contractWasm);

    if (wasmFns) {
      setFunctions({ codeHash, functions: wasmFns });
      return wasmFns;
    }
  } catch (e) {
    console.log(e);
  }
});
