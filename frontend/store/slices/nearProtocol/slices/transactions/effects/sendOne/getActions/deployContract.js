import { transactions } from 'near-api-js';

export const deployContract = async (action, backend) => {
  const code = await backend.sendRequest('nearProtocol.transactions.getContract', {
    fileName: action.fileName,
  });
  return transactions.deployContract(code);
};
