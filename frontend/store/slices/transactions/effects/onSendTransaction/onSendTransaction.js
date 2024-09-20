import { JsonRpcProvider } from 'near-api-js/lib/providers';
import { effect } from '../../../../../../react-vault/index.js';
import { createTx } from './createTx.js';
import { signTx } from './signTx.js';

const getSignerPrivateKey = async (publicKey, getKey) => {
  const key = await getKey(publicKey);
  return key.privateKey;
};

export const onSendTransaction = effect(async ({ slice, payload, store }) => {
  const { formValues } = payload;
  const { transactionId } = formValues;
  const { networkId, url } = store.getState((store) => store.networks.current);
  const getKey = store.getEffects((store) => store.keys.getKey);
  const addResult = slice.getActions((slice) => slice.addResult);
  const setOpenResult = slice.getActions((slice) => slice.setOpenResult);

  try {
    setOpenResult({ transactionId, isOpen: true, isLoading: true });

    const provider = new JsonRpcProvider({ url: url.rpc });
    const transaction = await createTx({ provider, form: formValues });

    const privateKey = await getSignerPrivateKey(formValues.signerKey.value, getKey);

    const signedTx = await signTx({
      transaction,
      networkId,
      privateKey,
    });

    const result = await provider.sendTransaction(signedTx);
    console.log(result);

    addResult({ transactionId, result });
  } catch (e) {
    console.log(e);
    addResult({ transactionId, result: `Error: ${e.message}` });
  }
});
