import { GetAccount } from './GetAccount/GetAccount.jsx';
import { CallViewMethod } from './CallViewMethod/CallViewMethod.jsx';

const fields = {
  getAccount: GetAccount,
  callViewMethod: CallViewMethod,
};

export const getFields = (method) => (!fields[method] ? null : fields[method]);

const r = {
  name: 'Call#10',
  method: 'getAccount',
  params: {
    accountId: 'nearkat.testnet',
    finality: 'final',
  },
};
