import { effect } from '@react-vault';
import { createTx } from './createTx.js';
import { signTx } from './signTx.js';

const getErrorMessage = (error) => {
  return error?.rpc ? error.rpc : { internalError: error.message };
};

export const sendOne = effect(async ({ store, slice, payload }) => {
  const { formValues, spaceId, networkId, transactionId } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const [rpc] = store.getEntities((store) => store.nearProtocol.rpcProvider);
  const getKey = store.getEffects((store) => store.nearProtocol.keys.getKey);
  const setResult = slice.getActions((slice) => slice.setResult);

  try {
    setResult({ transactionId, isOpen: true, isLoading: true });

    await rpc.configure({ spaceId, networkId });

    const transaction = await createTx({ rpc, formValues, backend });

    const { privateKey } = await getKey({
      spaceId,
      networkId,
      publicKey: formValues.signerKey.value,
    });

    const signedTransaction = await signTx({
      transaction,
      networkId,
      privateKey,
    });

    const result = await rpc.sendSignedTransaction({ signedTransaction });
    setResult({ transactionId, result, error: null, isLoading: false });
  } catch (e) {
    console.log(e);
    setResult({ transactionId, result: null, error: getErrorMessage(e), isLoading: false });
  }
});
