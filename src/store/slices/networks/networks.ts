import { setNetworks } from './actions/setNetworks.ts';
import { getNetworks } from './effects/getNetworks.ts';
import { getNetwork } from './effects/getNetwork.ts';
import { setCurrent } from './actions/setCurrent.ts';
import { setCurrentNetwork } from './actions/setCurrentNetwork.ts';
import { addNetwork } from './actions/addNetwork.ts';
import { createNetwork } from './effects/createNetwork.ts';
import { deleteNetwork } from './effects/deleteNetwork.ts';
import { removeNetwork } from './actions/removeNetwork.ts';
import { editNetwork } from './effects/editNetwork.ts';
import { updateNetwork } from './actions/updateNetwork.ts';
import { changeNetwork } from './effects/changeNetwork.ts';

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
