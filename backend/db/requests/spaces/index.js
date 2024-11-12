import { getAll } from './getAll.js';
import { getCount } from './getCount.js';
import { create } from './create.js';
import { remove } from './remove.js';
import { validateSpaceId } from './validateSpaceId.js';
import { getOne } from './getOne.js';
import { updateOne } from './updateOne.js';

export const spaces = {
  getAll,
  getCount,
  create,
  remove,
  validateSpaceId,
  getOne,
  updateOne,
};
