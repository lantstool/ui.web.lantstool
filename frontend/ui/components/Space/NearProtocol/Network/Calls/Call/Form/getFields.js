import { GetAccountData } from './GetAccountData/GetAccountData.jsx';
import { CallViewMethod } from './CallViewMethod/CallViewMethod.jsx';

const fields = {
  getAccountData: GetAccountData,
  callViewMethod: CallViewMethod,
};

export const getFields = (method) => (!fields[method] ? null : fields[method]);
