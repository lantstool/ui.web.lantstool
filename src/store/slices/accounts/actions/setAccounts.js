import { action } from '../../../../react-vault/index.js';

export const setAccounts = action(({ slice, payload: accounts }) => {
  const ids = [];
  const records = {};

  accounts.forEach((account) => {
    ids.push(account.accountId);
    records[account.accountId] = account;
  });

  slice.ids = ids;
  slice.records = records;
  slice.isAccountsLoadedToState = true;
});
