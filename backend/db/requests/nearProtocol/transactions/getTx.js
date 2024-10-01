export const getTx = async ({ execute, request }) => {
  const transactionId = request.body;

  const query = `
    SELECT transactionId, name, createdAt, body 
    FROM near_protocol_transactions
    WHERE transactionId = '${transactionId}';
  `;
  const [transaction] = await execute(query);

  if (!transaction) throw new Error(`Transaction: ${transactionId} not found`);

  transaction.body = JSON.parse(transaction.body);
  return transaction;
};
