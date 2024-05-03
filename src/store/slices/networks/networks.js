import { setNetworks } from './actions/setNetworks.js';
import { getNetworks } from './effects/getNetworks.js';
import { getNetwork } from './effects/getNetwork.js';
import { setCurrent } from './actions/setCurrent.js';
import { setCurrentNetwork } from './actions/setCurrentNetwork.js';
import { addNetwork } from './actions/addNetwork.js';
import { createNetwork } from './effects/createNetwork.js';
import { deleteNetwork } from './effects/deleteNetwork.js';
import { removeNetwork } from './actions/removeNetwork.js';
import { editNetwork } from './effects/editNetwork.js';
import { updateNetwork } from './actions/updateNetwork.js';
import { changeNetwork } from './effects/changeNetwork.js';

export const networks = {
  current: null,
  list: [],
  map: {},
  // actions
  setNetworks,
  addNetwork,
  setCurrent,
  setCurrentNetwork,
  removeNetwork,
  updateNetwork,
  // effects
  getNetworks,
  getNetwork,
  createNetwork,
  deleteNetwork,
  editNetwork,
  changeNetwork,
};
