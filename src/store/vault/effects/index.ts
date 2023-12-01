import { onAddAccount } from './onAddAccount.ts';
import { onInitPage } from './onInitPage.ts';
import { onRemoveAccount } from './onRemoveAccount.ts';
import { onGetAccessKeyList } from './onGetAccessKeyList.tsx';

export const effects = {
  onInitPage,
  onAddAccount,
  onRemoveAccount,
  onGetAccessKeyList,
};
