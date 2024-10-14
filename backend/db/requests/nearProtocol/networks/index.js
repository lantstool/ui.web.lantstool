import { create } from './create.js';
import { getAll } from './getAll.js';
import { getOne } from './getOne.js';
import { getActiveRpc } from './getActiveRpc.js';
import { remove } from './remove.js';
import { validateNetworkId } from './validateNetworkId.js';

export const networks = {
  create,
  getAll,
  getOne,
  getActiveRpc,
  remove,
  validateNetworkId,
};
