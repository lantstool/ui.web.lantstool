import { JsonRpcProvider } from 'near-api-js/lib/providers';
import { effect } from '../../../../../react-vault';
import { createTx } from './createTx.ts';
import { signTx } from './signTx.ts';

const getSignerPrivateKey = async (publicKey: string, getKey: any) => {
  const key = await getKey(publicKey);
  return key.privateKey;
};

export const onSendTransaction = effect(async ({ payload, store }: any) => {
  const { formValues, setResult } = payload;
  const { networkId, url } = store.getState((store: any) => store.networks.current);
  const getKey = store.getEffects((store: any) => store.keys.getKey);

  try {
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
    setResult(result);
  } catch (e) {
    console.log(e);
    setResult(`Error: ${e.message}`);
  }
});
