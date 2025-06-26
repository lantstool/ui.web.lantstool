import { setFunctions } from './actions/setFunctions.js';
import { getContractFunctions } from './effects/getContractFunctions.js';

export const contractsMethods = {
  //state
  records: {},
  //actions
  setFunctions,
  //effects
  getContractFunctions,
};
