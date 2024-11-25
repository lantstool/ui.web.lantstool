import { createManually } from './createManually.js';
import { getAll } from './getAll.js';
import { getOne } from './getOne.js';
import { isOne } from './isOne.js';
import { getRpcData } from './getRpcData.js';
import { remove } from './remove.js';
import { validateNetworkId } from './validateNetworkId.js';
import { createFromPreset } from './createFromPreset.js';

export const networks = {
  createManually,
  createFromPreset,
  getAll,
  getOne,
  isOne,
  getRpcData,
  remove,
  validateNetworkId,
};
