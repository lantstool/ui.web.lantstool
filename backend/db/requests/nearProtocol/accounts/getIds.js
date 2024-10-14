export const getIds = async ({ execute, request }) => {
  const { spaceId, networkId } = request.body;

  const query = `
    SELECT accountId FROM near_protocol_accounts
    WHERE spaceId = '${spaceId}' AND networkId = '${networkId}'
  `;

  const accounts = await execute(query);
  return accounts.map((account) => account.accountId);
};
