import { effect } from '@react-vault';
import { methods } from './methods/index.js';

export const executeOne = effect(async ({ store, slice, payload }) => {
  const { spaceId, networkId, callId, formValues } = payload;
  const createRpc = store.getEffects((store) => store.nearProtocol.createRpc);
  const setResult = slice.getActions((slice) => slice.setResult);

  try {
    setResult({ callId, isOpen: true, isLoading: true });
    const rpc = await createRpc({ spaceId, networkId });

    console.log(formValues);
    const result = await methods[formValues.method.value](rpc, formValues.params);
    setResult({ callId, result, isLoading: false });
  } catch (e) {
    console.log(e);
    setResult({ callId, result: `Error: ${e.message}`, isLoading: false });
  }
});
