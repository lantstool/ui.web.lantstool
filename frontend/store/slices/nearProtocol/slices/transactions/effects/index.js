import { create } from './create.js';
import { getCount } from './getCount.js';
import { getList } from './getList.js';
import { getTx } from './getTx.js';
import { reorder } from './reorder.js';
import { removeOne } from './removeOne.js';
import { duplicateOne } from './duplicateOne.js';
import { updateOneName } from './updateOneName.js';
import { sendOne } from './sendOne/sendOne.js';
import { revertChanges } from './revertChanges.js';
import { saveChanges } from './saveChanges.js';

export const effects = {
  getList,
  reorder,
  getCount,
  create,
  getTx,
  sendOne,
  updateOneName,
  duplicateOne,
  revertChanges,
  saveChanges,
  removeOne,
};
