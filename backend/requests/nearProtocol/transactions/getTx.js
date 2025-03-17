import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';

export const getTx = async ({ execute, request }) => {
  const query = `
    SELECT * FROM near_protocol_transactions
    WHERE transactionId = @transactionId;
  `;
  const [transaction] = await execute(query, addPrefixToObjKeys(request.body));

  transaction.body = JSON.parse(transaction.body);
  return transaction;
};
