export const updateTxBody = async ({ execute, request }) => {
  const { transactionId, body } = request.body;

  const query = `
    UPDATE near_protocol_transactions
    SET body = '${JSON.stringify(body)}'
    WHERE transactionId = '${transactionId}'
  `;

  await execute(query);
};
