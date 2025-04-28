import { utils } from 'near-api-js';
import { PublicKey } from 'near-api-js/lib/utils';
import { createTransaction } from 'near-api-js/lib/transaction';
import { transformActions } from './transformActions/transformActions.js';
import { signTransaction } from './signTransaction.js';
import { getSignerPrivateKey } from './getSignerPrivateKey.js';

export async function createAndSendTransaction({
  signerId,
  signerPublicKey,
  signerPrivateKey = null,
  actions,
  receiverId,
  spaceId,
  networkId,
  waitUntil = 'EXECUTED_OPTIMISTIC',
  responseNameConvention = 'camelCase',
}) {
  const getKey = this.store.getEffects((store) => store.nearProtocol.keys.getKey);

  const accessKey = await this.getAccountKey({ accountId: signerId, publicKey: signerPublicKey });
  const nonce = accessKey.nonce + 1;
  const recentBlockHash = utils.serialize.base_decode(accessKey.blockHash);
  const transformedActions = await transformActions(actions);

  const transaction = createTransaction(
    signerId,
    PublicKey.from(signerPublicKey),
    receiverId,
    nonce,
    transformedActions,
    recentBlockHash,
  );

  const privateKey = await getSignerPrivateKey({
    spaceId,
    networkId,
    signerPublicKey,
    signerPrivateKey,
    getKey,
  });

  const signedTransaction = await signTransaction({ transaction, networkId, privateKey });

  return await this.sendSignedTransaction({
    signedTransaction,
    waitUntil,
    responseNameConvention,
  });
}
