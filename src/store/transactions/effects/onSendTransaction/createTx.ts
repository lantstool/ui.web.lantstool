import { PublicKey } from 'near-api-js/lib/utils';
import { utils } from 'near-api-js';
import {
  createAccount,
  transfer,
  addKey,
  fullAccessKey,
  functionCallAccessKey,
  createTransaction,
} from 'near-api-js/lib/transaction';

const getCreateAccountAction = () => createAccount();

const getTransferAction = (action: any) => transfer(utils.format.parseNearAmount(action.amount));

const getAddKeyAction = (action: any) => {
  const { type, restrictions } = action.permission;

  const getFunctionCallKey = () => {};

  const accessKey =
    type === 'FullAccess' ? fullAccessKey() : functionCallAccessKey(restrictions.receiverId, []);

  return addKey(utils.PublicKey.from(action.publicKey), accessKey);
};

const getActions = (actions: any) =>
  actions.map((action: any) => {
    if (action.type === 'CreateAccount') return getCreateAccountAction();
    if (action.type === 'AddKey') return getAddKeyAction(action);
    if (action.type === 'Transfer') return getTransferAction(action);
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
