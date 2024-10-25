export const getOne = async ({ execute, request }) => {
  const { spaceId, networkId, accountId } = request.body;

  const query = `
    SELECT accountId, note, createdAt
    FROM near_protocol_accounts
    WHERE spaceId = '${spaceId}'
     AND networkId = '${networkId}'
     AND accountId = '${accountId}';
  `;
  const [account] = await execute(query);

  return account;
};
