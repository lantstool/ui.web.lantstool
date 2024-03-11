import { action } from '../../../../react-vault';

export const setContract = action(({ slice, payload }: any) => {
  const { accountId, newAccount } = payload;
  slice.records[accountId] = newAccount;
});
