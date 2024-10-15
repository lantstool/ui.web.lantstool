export const updateOneName = async ({ execute, request }) => {
  const { transactionId, name } = request.body;

  const query = `
    UPDATE near_protocol_transactions
    SET name = '${name}'
    WHERE transactionId = '${transactionId}'
  `;

  await execute(query);
};
