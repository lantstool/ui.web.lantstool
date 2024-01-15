import { onAddAccount } from './onAddAccount.ts';
import { onInitPage } from './onInitPage.ts';
import { onRemoveAccount } from './onRemoveAccount.ts';
import { onAddKey } from './onAddKey.ts';
import { onRemoveKey } from './onRemoveKey.ts';
import { getAccountsIds } from "./getAccountsIds.ts";
import { getAccount } from "./getAccount.ts";

export const effects = {
  onInitPage,
  onAddAccount,
  onRemoveAccount,
  onAddKey,
  onRemoveKey,
  getAccountsIds,
  getAccount,
};
