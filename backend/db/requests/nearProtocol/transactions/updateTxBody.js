import { updateContractUsage } from './helpers/updateContractUsage.js';

export const updateTxBody = async ({ execute, request, storage }) => {
  const { transactionId, body } = request.body;

  await updateContractUsage({ execute, storage, transactionId, body });

  const query = `
    UPDATE near_protocol_transactions
    SET body = '${JSON.stringify(body)}'
    WHERE transactionId = '${transactionId}'
    RETURNING *;
  `;

  const [transaction] = await execute(query);
  transaction.body = JSON.parse(transaction.body);
  return transaction;
};
