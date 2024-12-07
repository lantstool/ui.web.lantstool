import { createManually } from './createManually.js';
import { getAll } from './getAll.js';
import { getOne } from './getOne.js';
import { isOne } from './isOne.js';
import { getRpcData } from './getRpcData.js';
import { updateActiveRpc } from './updateActiveRpc.js';
import { removeOne } from './removeOne.js';
import { validateNetworkId } from './validateNetworkId.js';
import { createFromPreset } from './createFromPreset.js';
import { addRpc } from './addRpc.js';
import { removeRpc } from './removeRpc.js';

export const networks = {
  createManually,
  createFromPreset,
  getAll,
  getOne,
  isOne,
  getRpcData,
  updateActiveRpc,
  removeOne,
  validateNetworkId,
  addRpc,
  removeRpc,
};
