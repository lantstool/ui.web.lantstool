import { GetAccountData } from './methods/GetAccountData/GetAccountData.jsx';
import { GetAccountsChanges } from './methods/GetAccountsChanges/GetAccountsChanges.jsx';
import { CallContractViewMethod } from './methods/CallContractViewMethod/CallContractViewMethod.jsx';

const fields = {
  getAccountData: GetAccountData,
  getAccountsChanges: GetAccountsChanges,
  callContractViewMethod: CallContractViewMethod,
};

export const getFields = (method) => (!fields[method] ? null : fields[method]);
