import { create } from './create.js';
import { getCount } from './getCount.js';
import { getList } from './getList.js';
import { reorder } from './reorder.js';
import { removeOne } from './removeOne.js';
import { duplicateOne } from './duplicateOne.js';
import { updateOneName } from './updateOneName.js';
import { sendOne } from './sendOne/sendOne.js';
import { revertChanges } from './revertChanges.js';
import { saveChanges } from './saveChanges.js';
import { onMountTransaction } from './onMountTransaction.js';
import { uploadContract } from './uploadContract.js';

export const effects = {
  getList,
  reorder,
  getCount,
  create,
  sendOne,
  updateOneName,
  duplicateOne,
  revertChanges,
  saveChanges,
  removeOne,
  onMountTransaction,
  uploadContract,
};
