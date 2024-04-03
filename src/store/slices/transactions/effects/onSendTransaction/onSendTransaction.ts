import { JsonRpcProvider } from 'near-api-js/lib/providers';
import { effect } from '../../../../../react-vault';
import { createTx } from './createTx.ts';
import { signTx } from './signTx.ts';

const getSignerPrivateKey = async (publicKey: string, getKey: any) => {
  const key = await getKey(publicKey);
  return key.privateKey;
};

export const onSendTransaction = effect(async ({ slice, payload, store }: any) => {
  const { formValues } = payload;
  const { transactionId } = formValues;
  const { networkId, url } = store.getState((store: any) => store.networks.current);
  const getKey = store.getEffects((store: any) => store.keys.getKey);
  const addResult = slice.getActions((slice: any) => slice.addResult);
  const setOpenResult = slice.getActions((slice: any) => slice.setOpenResult);

  try {
    setOpenResult({ transactionId, isOpen: true, isLoading: true });

    const provider = new JsonRpcProvider({ url: url.rpc });
    const transaction = await createTx({ provider, form: formValues });
    console.log(transaction);
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
