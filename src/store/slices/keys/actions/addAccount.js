import { action } from '../../../../react-vault';

export const addAccount = action(({ slice, payload }) => {
  const { account } = payload;
  slice.list.push(account.accountId);
  slice.map[account.accountId] = account;
});
