import { setFunctions } from './actions/setFunctions.js';
import { setContractHash } from './actions/setContractHash.js';
import { addContract } from './effects/addContract.js';

export const contractAbi = {
  //state
  records: {},
  contractHash: null,
  //actions
  setFunctions,
  setContractHash,
  //effects
  addContract,
};
