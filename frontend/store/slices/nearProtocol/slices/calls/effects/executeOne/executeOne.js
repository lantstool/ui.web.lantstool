import { effect } from '@react-vault';
import { methods } from './methods/index.js';

const getErrorMessage = (error) => {
  try {
    return JSON.parse(error.message);
  } catch (e) {
    return { internalError: error.message };
  }
};

export const executeOne = effect(async ({ store, slice, payload }) => {
  const { spaceId, networkId, callId, formValues } = payload;
  const [rpc] = store.getEntities((store) => store.nearProtocol.rpcProvider);
  const setResult = slice.getActions((slice) => slice.setResult);

  try {
    setResult({ callId, isOpen: true, isLoading: true });

    await rpc.configure({ spaceId, networkId });
    const result = await methods[formValues.method.value](rpc, formValues);

    setResult({ callId, result, isLoading: false });
  } catch (e) {
    console.log(e);
    setResult({
      callId,
      result: getErrorMessage(e),
      isLoading: false,
    });
  }
});
