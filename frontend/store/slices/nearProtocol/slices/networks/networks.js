import { create } from './effects/create.js';
import { setNetworks } from './actions/setNetworks.js';
import { getAll } from './effects/getAll.js';
import { getNetwork } from './effects/getNetwork.js';
import { setCurrent } from './actions/setCurrent.js';
import { setCurrentNetwork } from './actions/setCurrentNetwork.js';
import { addNetwork } from './actions/addNetwork.js';
import { remove } from './effects/remove.js';
import { removeNetwork } from './actions/removeNetwork.js';
import { editNetwork } from './effects/editNetwork.js';
import { updateNetwork } from './actions/updateNetwork.js';
import { changeNetwork } from './effects/changeNetwork.js';

export const networks = {
  active: null,
  list: [],
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
  remove,
  getNetwork,
  editNetwork,
  changeNetwork,
};
