import { transactions } from 'near-api-js';

export const deployContract = async (action, backend) => {
  const u8Contract = await backend.sendRequest('nearProtocol.transactions.getU8Contract', {
    fileName: action.fileName,
  });
  return transactions.deployContract(u8Contract);
};
