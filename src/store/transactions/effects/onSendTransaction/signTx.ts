import { transactions, InMemorySigner, utils, keyStores } from 'near-api-js';

export const signTx = async ({ transaction, networkId, privateKey }: any) => {
  const keyPair = utils.KeyPair.fromString(privateKey);
  const keyStore = new keyStores.InMemoryKeyStore();
  await keyStore.setKey(networkId, transaction.signerId, keyPair);

  const signer = new InMemorySigner(keyStore);

  const [_hash, signature] = await transactions.signTransaction(
    transaction,
    signer,
    transaction.signerId,
    networkId,
  );

  return signature;
}
