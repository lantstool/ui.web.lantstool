import { setContractsOnce } from './actions/setContractsOnce.ts';
import { addContract } from './actions/addContract.ts';
import { createContract } from './effects/createContract.ts';
import { loadContractsOnce } from './effects/loadContractsOnce.ts';

export const contracts = {
  // init state
  isContractsLoadedToState: false,
  ids: [],
  records: {},
  // actions
  setContractsOnce,
  addContract,
  // effects
  createContract,
  loadContractsOnce,
};
