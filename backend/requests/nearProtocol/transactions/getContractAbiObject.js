import { NearWasmRuntime } from '../../../nearProtocol/nearWasmRuntime.js';
import { getU8Contract } from './getU8Contract.js';
import { decompress } from 'fzstd';

// This function accept fileName, find uploaded WASM, run its view method
// __contract_abi and return ABI Object
export const getContractAbiObject = async ({ request, storage }) => {
  try {
    const u8Contract = await getU8Contract({ request, storage });
    const runtime = new NearWasmRuntime({ contractCode: Buffer.from(u8Contract) });
    const { result } = await runtime.execute('__contract_abi');

    // unzip ABI and convert to object
    const rawAbi = decompress(new Uint8Array(result));
    const json = new TextDecoder().decode(rawAbi);
    return JSON.parse(json);
  } catch (e) {
    console.log(e);
    throw new Error(`Can't get contract ABI`);
  }
};
