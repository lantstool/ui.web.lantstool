import { initPage } from './initPage.ts';
import { addAccount } from './addAccount.ts';
import { removeAccount } from './removeAccount.ts';
import { getAccessKeyList } from './getAccessKeyList.ts';
import {addKey} from "./addKey.ts";

export const actions: any = {
  initPage,
  addAccount,
  removeAccount,
  getAccessKeyList,
  addKey
};
