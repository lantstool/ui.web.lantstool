import { onAddAccount } from './onAddAccount.ts';
import { onInitPage } from './onInitPage.ts';
import { onRemoveAccount } from './onRemoveAccount.ts';
import { onGetAccessKeyList } from './onGetAccessKeyList.tsx';
import { onAddKey } from './onAddKey.ts';
import { onRemoveKey } from './onRemoveKey.ts';

export const effects = {
  onInitPage,
  onAddAccount,
  onRemoveAccount,
  onGetAccessKeyList,
  onAddKey,
  onRemoveKey,
};
