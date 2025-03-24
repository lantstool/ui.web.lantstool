import { createOne } from './createOne.js';
import { getCount } from './getCount.js';
import { getList } from './getList.js';
import { getOne } from './getOne.js';
import { updateOneBody } from './updateOneBody.js';
import { updateOneName } from './updateOneName.js';
import { duplicateOne } from './duplicateOne.js';
import { reorder } from './reorder.js';
import { removeOne } from './removeOne.js';
import { validateCallId } from './validateCallId.js';
import { importOne } from './importOne.js';

export const calls = {
  getCount,
  getList,
  reorder,
  createOne,
  getOne,
  updateOneBody,
  updateOneName,
  duplicateOne,
  removeOne,
  validateCallId,
  importOne,
};
