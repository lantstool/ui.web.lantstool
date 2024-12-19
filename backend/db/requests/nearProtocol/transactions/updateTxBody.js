export const updateTxBody = async ({ execute, request }) => {
  const { transactionId, body } = request.body;

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
