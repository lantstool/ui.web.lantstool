import { effect } from '@react-vault';
import { createTx } from './createTx.js';
import { signTx } from './signTx.js';

export const sendOne = effect(async ({ store, slice, payload }) => {
  const { formValues, spaceId, networkId, transactionId } = payload;
  const [rpc] = store.getEntities((store) => store.nearProtocol.rpcProvider);
  const getKey = store.getEffects((store) => store.nearProtocol.keys.getKey);
  const setResult = slice.getActions((slice) => slice.setResult);

  try {
    setResult({ transactionId, isOpen: true, isLoading: true });

    await rpc.configure({ spaceId, networkId });
    const transaction = await createTx({ rpc, formValues });

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

    const result = await rpc.sendTransaction({ signedTransaction });
    setResult({ transactionId, result, isLoading: false });
  } catch (e) {
    console.log(e);
    setResult({ transactionId, result: `Error: ${e.message}`, isLoading: false });
  }
});
