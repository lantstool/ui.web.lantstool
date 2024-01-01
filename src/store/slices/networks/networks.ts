import { setNetworks } from './actions/setNetworks.ts';
import { getNetworks } from './effects/getNetworks.ts';
import { setCurrent } from "./actions/setCurrent.ts";

export const networks = {
  current: null,
  list: [],
  map: { a: 1 }, // TODO: fix bug - react-vault remove empty object from model
  // actions
  setNetworks,
  setCurrent,
  // effects
  getNetworks,
};
