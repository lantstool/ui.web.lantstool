import { action } from '../../../react-vault';

export const addKey = action(({ slice, payload }: any) => {
  const { account, accountId } = payload;

  slice.map[accountId].list.push(account.publicKey);
  slice.map[accountId].map[account.publicKey] = account
});
