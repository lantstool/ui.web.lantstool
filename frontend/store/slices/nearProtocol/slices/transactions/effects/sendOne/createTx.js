import { PublicKey } from 'near-api-js/lib/utils';
import { utils } from 'near-api-js';
import { createTransaction } from 'near-api-js/lib/transaction';
import { getActions } from './getActions/getActions.js';

export const createTx = async ({ rpc, formValues }) => {
  const { signerId, signerKey, receiverId, actions: rawActions } = formValues;

  // TODO: Refactor and use general tx structure instead of the form structure
  const signerAccountId = signerId.value;
  const signerPublicKey = signerKey.value;
  const receiverAccountId = receiverId.value;

  const accessKey = await rpc.keys.getKey(signerAccountId, signerPublicKey);
  const nonce = accessKey.nonce + 1;
  const recentBlockHash = utils.serialize.base_decode(accessKey.blockHash);

  const actions = await getActions(rawActions);

  return createTransaction(
    signerAccountId,
    PublicKey.from(signerPublicKey),
    receiverAccountId,
    nonce,
    actions,
    recentBlockHash,
  );
};
