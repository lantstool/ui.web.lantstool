import { PublicKey } from 'near-api-js/lib/utils';
import { transactions, utils } from 'near-api-js';

const getTransferAction = (action: any) =>
  transactions.transfer(utils.format.parseNearAmount(action.amount));

const getActions = (actions: any) =>
  actions.map((action: any) => {
    if (action.type === 'Transfer') return getTransferAction(action);
  });


export const createTx = async ({ provider, form }: any) => {
  const { signer, signerKey, receiver, actions } = form;

  const pk = PublicKey.from(signerKey.publicKey);
  const accessKey = await provider.query(`access_key/${signer.accountId}/${pk.toString()}`, '');
  const nonce = accessKey.nonce + 1;
  const recentBlockHash = utils.serialize.base_decode(accessKey.block_hash);
  const receiverId = receiver[receiver.type].accountId;

  return transactions.createTransaction(
    signer.accountId,
    pk,
    receiverId,
    nonce,
    getActions(actions),
    recentBlockHash,
  );
};
