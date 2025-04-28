import { transactions, utils } from 'near-api-js';

export const deleteKey = (action) => transactions.deleteKey(utils.PublicKey.from(action.publicKey));
