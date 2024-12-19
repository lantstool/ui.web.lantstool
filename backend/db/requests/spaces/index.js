import { getAll } from './getAll.js';
import { getCount } from './getCount.js';
import { create } from './create.js';
import { remove } from './remove.js';
import { validateSpaceId } from './validateSpaceId.js';
import { getOne } from './getOne.js';
import { updateOneName } from './updateOneName.js';
import { updateOneBadge } from './updateOneBadge.js';

export const spaces = {
  getAll,
  getCount,
  create,
  remove,
  validateSpaceId,
  getOne,
  updateOneName,
  updateOneBadge,
};
