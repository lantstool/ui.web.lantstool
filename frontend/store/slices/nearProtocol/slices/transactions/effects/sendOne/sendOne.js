import { effect } from '../../../../../../../../react-vault/index.js';
import { createTx } from './createTx.js';
import { signTx } from './signTx.js';

export const sendOne = effect(async ({ store, slice, payload }) => {
  const { formValues, spaceId, networkId, transactionId } = payload;
  const createRpc = store.getEffects((store) => store.nearProtocol.createRpc);
  const getKey = store.getEffects((store) => store.nearProtocol.keys.getKey);
  const setResult = slice.getActions((slice) => slice.setResult);

  try {
    setResult({ transactionId, isOpen: true, isLoading: true });
    const rpc = await createRpc({ spaceId, networkId });
    const transaction = await createTx({ rpc, formValues });

    const { privateKey } = await getKey({
      spaceId,
      networkId,
      publicKey: formValues.signerKey.value,
    });

    const signedTx = await signTx({
      transaction,
      networkId,
      privateKey,
    });

    const result = await rpc.transactions.sendTx(signedTx);
    setResult({ transactionId, result, isLoading: false });
  } catch (e) {
    console.log(e);
    setResult({ transactionId, result: `Error: ${e.message}`, isLoading: false });
  }
});
