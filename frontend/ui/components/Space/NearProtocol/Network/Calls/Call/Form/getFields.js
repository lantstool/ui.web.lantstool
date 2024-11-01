import { GetAccountData } from './methods/GetAccountData/GetAccountData.jsx';
import { GetAccountChanges } from './methods/GetAccountChanges/GetAccountChanges.jsx';
import { CallContractViewMethod } from './methods/CallContractViewMethod/CallContractViewMethod.jsx';

const fields = {
  getAccountData: GetAccountData,
  getAccountChanges: GetAccountChanges,
  callContractViewMethod: CallContractViewMethod,
};

export const getFields = (method) => (!fields[method?.value] ? null : fields[method?.value]);
