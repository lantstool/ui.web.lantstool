import { transactions, InMemorySigner, utils, keyStores } from 'near-api-js';

export const signTransaction = async ({ transaction, networkId, privateKey }) => {
  const keyPair = utils.KeyPair.fromString(privateKey);
  const keyStore = new keyStores.InMemoryKeyStore();
  await keyStore.setKey(networkId, transaction.signerId, keyPair);

  const signer = new InMemorySigner(keyStore);

  const [_hash, signedTransaction] = await transactions.signTransaction(
    transaction,
    signer,
    transaction.signerId,
    networkId,
  );

  return signedTransaction;
};
