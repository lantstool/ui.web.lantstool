export const getOne = async ({ execute, request }) => {
  const accountId = request.body;

  const query = `
    SELECT accountId, note, createdAt
    FROM near_protocol_accounts
    WHERE accountId = '${accountId}';
  `;
  const [account] = await execute(query);

  return account;
};