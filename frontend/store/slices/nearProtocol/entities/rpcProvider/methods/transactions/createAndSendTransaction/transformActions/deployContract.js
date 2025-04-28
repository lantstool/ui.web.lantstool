import { transactions } from 'near-api-js';

export const deployContract = async (action) => transactions.deployContract(action.u8Contract);
