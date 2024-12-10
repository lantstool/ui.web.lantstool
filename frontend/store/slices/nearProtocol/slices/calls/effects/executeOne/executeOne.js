import { effect } from '@react-vault';
import { methods } from './methods/index.js';

const getErrorMessage = (error) => {
  return error?.rpc ? error.rpc : { internalError: error.message };
};

const getRpcPriority = (formValues) => {
  if (
    formValues.blockTarget === 'specific' ||
    formValues.epochTarget === 'specific' ||
    formValues.method.value === 'getChunk' ||
    formValues.method.value === 'getTransaction' ||
    formValues.method.value === 'getDetailedTransaction' ||
    formValues.method.value === 'getReceipt'
  ) {
    return ['archival', 'regular'];
  }
  return ['regular', 'archival'];
};

export const executeOne = effect(async ({ store, slice, payload }) => {
  const { spaceId, networkId, callId, formValues } = payload;
  const [rpc] = store.getEntities((store) => store.nearProtocol.rpcProvider);
  const setResult = slice.getActions((slice) => slice.setResult);

  try {
    setResult({ callId, isOpen: true, isLoading: true, formValues });

    await rpc.configure({ spaceId, networkId, priority: getRpcPriority(formValues) });
    const result = await methods[formValues.method.value](rpc, formValues);

    setResult({ callId, result, isLoading: false, error: null });
  } catch (e) {
    console.log(e);
    setResult({
      callId,
      error: getErrorMessage(e),
      result: null,
      isLoading: false,
    });
  }
});
