import { PublicKey } from 'near-api-js/lib/utils';
import { utils } from 'near-api-js';
import { createTransaction } from 'near-api-js/lib/transaction';
import { getAction } from './getAction';

// TODO move to getActions folder
const getActions = (actions: any) =>
  actions.map((action: any) => {
    if (action.type === 'CreateAccount') return getAction.createAccount();
    if (action.type === 'AddKey') return getAction.addKey(action);
    if (action.type === 'Transfer') return getAction.transfer(action);
    if (action.type === 'FunctionCall') return getAction.functionCall(action);
  });

export const createTx = async ({ provider, form }: any) => {
  const { signer, signerKey, receiver, actions } = form;

  const pk = PublicKey.from(signerKey.publicKey);
  const accessKey = await provider.query(`access_key/${signer.accountId}/${pk.toString()}`, '');
  const nonce = accessKey.nonce + 1;
  const recentBlockHash = utils.serialize.base_decode(accessKey.block_hash);
  const receiverId = receiver[receiver.type].accountId;

  return createTransaction(
    signer.accountId,
    pk,
    receiverId,
    nonce,
    getActions(actions),
    recentBlockHash,
  );
};
