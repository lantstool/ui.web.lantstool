import { create } from './create.js';
import { getCount } from './getCount.js';
import { getList } from './getList.js';
import { getTx } from './getTx.js';
import { reorder } from './reorder.js';
import { removeOne } from './removeOne.js';
import { duplicateOne } from './duplicateOne.js';
import { updateOneName } from './updateOneName.js';
import { save } from './save.js';
import { onSendTransaction } from './onSendTransaction/onSendTransaction.js';
import { revertTransaction } from './revertTransaction.js';

export const effects = {
  getList,
  reorder,
  getCount,
  create,
  getTx,
  onSendTransaction,
  updateOneName,
  duplicateOne,
  revertTransaction,
  save,
  removeOne,
};
