import { PublicKey } from 'near-api-js/lib/utils';
import { utils } from 'near-api-js';
import { createTransaction } from 'near-api-js/lib/transaction';
import { getActions } from './getActions/getActions.js';

export const createTx = async ({ provider, form }) => {
  const { signerId, signerKey, receiver, actions: rawActions } = form;

  const signerAccountId = signerId.value;
  const signerPublicKey = signerKey.value;
  const receiverId = receiver.value? receiver.value : receiver;

  const accessKey = await provider.query(`access_key/${signerAccountId}/${signerPublicKey}`, '');
  const nonce = accessKey.nonce + 1;
  const recentBlockHash = utils.serialize.base_decode(accessKey.block_hash);

  const actions = await getActions(rawActions);

  return createTransaction(
    signerAccountId,
    PublicKey.from(signerPublicKey),
    receiverId,
    nonce,
    actions,
    recentBlockHash,
  );
};
