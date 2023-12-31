import { JsonRpcProvider } from 'near-api-js/lib/providers';
import { effect } from '../../../../../react-vault';
import { createTx } from './createTx.ts';
import { signTx } from './signTx.ts';

const networkId = 'testnet';

// TODO get network info from store
export const onSendTransaction = effect(async ({ payload: form }: any) => {
  try {
    const provider = new JsonRpcProvider({ url: `https://rpc.${networkId}.near.org` });

    const transaction = await createTx({ provider, form });
    console.log(transaction);

    const signedTx = await signTx({
      transaction,
      networkId,
      privateKey: form.signerKey.privateKey,
    });

    console.log(signedTx);
    const a = await provider.sendTransaction(signedTx);
    console.log(a);
  } catch (e) {
    console.log(e);
  }
});
