import { PublicKey } from 'near-api-js/lib/utils';
import { utils } from 'near-api-js';
import { createTransaction } from 'near-api-js/lib/transaction';
import { getActions } from './getActions/getActions.js';

export const createTx = async ({ rpc, formValues }) => {
  const { signerId, signerKey, receiverId, actions: rawActions } = formValues;

  const accessKey = await rpc.keys.getKey(signerId, signerKey);
  const nonce = accessKey.nonce + 1;
  const recentBlockHash = utils.serialize.base_decode(accessKey.blockHash);
  const actions = await getActions(rawActions);

  return createTransaction(
    signerId,
    PublicKey.from(signerKey),
    receiverId,
    nonce,
    actions,
    recentBlockHash,
  );
};
