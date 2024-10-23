import { action } from '@react-vault';

export const setAccounts = action(({ slice, payload: accounts }) => {
  slice.ids = [];
  slice.records = {};

  accounts.forEach((account) => {
    slice.ids.push(account.accountId);
    slice.records[account.accountId] = account;
  });
});
