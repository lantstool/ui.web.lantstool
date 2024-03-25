import { setContractsOnce } from './actions/setContractsOnce.ts';
import { addContract } from './actions/addContract.ts';
import { setMethod } from './actions/setMethod.ts';
import { removeContract } from './actions/removeContract.ts';
import { createContract } from './effects/createContract.ts';
import { loadContractsOnce } from './effects/loadContractsOnce.ts';
import { addMethod } from './effects/addMethod.ts';
import { deleteContract } from './effects/deleteContract.ts';

export const contracts = {
  // init state
  isContractsLoadedToState: false,
  ids: [],
  records: {},
  // actions
  setContractsOnce,
  addContract,
  setMethod,
  removeContract,
  // effects
  createContract,
  loadContractsOnce,
  addMethod,
  deleteContract,
};
