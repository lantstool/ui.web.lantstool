import { create } from './create.js';
import { getCount } from './getCount.js';
import { getList } from './getList.js';
import { getTx } from './getTx.js';
import { updateTxBody } from './updateTxBody.js';
import { updateOneName } from './updateOneName.js';
import { reorder } from './reorder.js';
import { removeOne } from './removeOne.js';

export const transactions = {
  create,
  getCount,
  getList,
  getTx,
  updateTxBody,
  updateOneName,
  reorder,
  removeOne,
};
