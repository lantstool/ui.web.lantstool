import { create } from './create.js';
import { getIds } from './getIds.js';
import { getKeyList } from './getKeysList.js';
import { getOne } from './getOne.js';
import { remove } from './remove.js';
import { validatePublicKey } from './validatePublicKey.js';
import { getPublicKey } from './getPublicKey.js';

export const keys = {
  create,
  getIds,
  getKeyList,
  getOne,
  remove,
  validatePublicKey,
  getPublicKey,
};
