import { create } from './effects/create.js';
import { setNetworks } from './actions/setNetworks.js';
import { getAll } from './effects/getAll.js';
import { setCurrent } from './actions/setCurrent.js';
import { setCurrentNetwork } from './actions/setCurrentNetwork.js';
import { addNetwork } from './actions/addNetwork.js';
import { remove } from './effects/remove.js';
import { removeNetwork } from './actions/removeNetwork.js';
import { updateNetwork } from './actions/updateNetwork.js';
import { getActiveRpc } from './effects/getActiveRpc.js';

export const networks = {
  ids: [],
  records: {},
  network: null,
  // actions
  setNetworks,
  addNetwork,
  setCurrent,
  setCurrentNetwork,
  removeNetwork,
  updateNetwork,
  // effects
  create,
  getAll,
  getActiveRpc,
  remove,
};
