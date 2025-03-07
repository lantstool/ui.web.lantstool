import { updateContractUsage } from '../../helpers/updateContractUsage.js';
import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';

export const updateTxBody = async ({ execute, request, storage }) => {
  const { transactionId, body } = request.body;

  await updateContractUsage({ execute, storage, transactionId, body });

  const query = `
    UPDATE near_protocol_transactions
    SET body = @body
    WHERE transactionId = @transactionId
    RETURNING *;
  `;

  const [transaction] = await execute(
    query,
    addPrefixToObjKeys({
      body: JSON.stringify(body),
      transactionId,
    }),
  );

  transaction.body = JSON.parse(transaction.body);
  return transaction;
};
