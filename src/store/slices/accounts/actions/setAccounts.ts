import { action } from '../../../../react-vault';

export const setAccounts = action(({ slice, payload: accounts }: any) => {
  const ids = [];
  const records: any = {};

  accounts.forEach((account: any) => {
    ids.push(account.accountId);
    records[account.accountId] = account;
  });

  slice.ids = ids;
  slice.records = records;
});
