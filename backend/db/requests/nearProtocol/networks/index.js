import { createManually } from './createManually.js';
import { getAll } from './getAll.js';
import { getOne } from './getOne.js';
import { getActiveRpc } from './getActiveRpc.js';
import { remove } from './remove.js';
import { validateNetworkId } from './validateNetworkId.js';
import { createPreset } from './createPreset.js';
import { getRpcList } from './getRpcList.js';

export const networks = {
  createManually,
  createPreset,
  getAll,
  getOne,
  getActiveRpc,
  remove,
  validateNetworkId,
  getRpcList,
};
