import { action } from '../../../react-vault';
import { initState } from '../initState.js';

export const initPage = action(({ slice, payload }: any) => {
  const list = [...initState.list];
  const map: any = { ...initState.map };

  payload.vault.forEach((account: any) => {
    list.push(account.accountId);
    map[account.accountId] = account;
  });

  slice.list = list;
  slice.map = map;
});
