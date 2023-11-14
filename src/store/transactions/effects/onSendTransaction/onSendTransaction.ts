import { providers } from 'near-api-js';
import { effect } from '../../../../react-vault';
import { createTx } from './createTx.ts';
import { signTx } from './signTx.ts';

// TODO get network info from store
export const onSendTransaction = effect(async ({ payload: form, slice, store }: any) => {
  try {
    const provider = new providers.JsonRpcProvider({ url: `https://rpc.testnet.near.org` });

    const transaction = await createTx({ provider, form });
    console.log(transaction);

    const signedTx = await signTx({
      transaction,
      networkId: 'testnet',
      privateKey: form.signerKey.privateKey,
    });

    console.log(signedTx);
    const a = await provider.sendTransaction(signedTx);
    console.log(a);
  } catch (e) {
    console.log(e);
  }
});
