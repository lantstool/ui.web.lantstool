export const getOne = async ({ execute, request }) => {
  const transactionId = request.body;

  const query = `
    SELECT transactionId, name, createdAt, body 
    FROM near_protocol_transactions
    WHERE transactionId = '${transactionId}';
  `;
  const [transaction] = await execute(query);

  transaction.body = JSON.parse(transaction.body);
  return transaction;
};
