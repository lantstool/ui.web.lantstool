export const remove = async ({ execute, request }) => {
  const { spaceId, networkId, accountId } = request.body;
  const query = `
    DELETE FROM near_protocol_accounts
    WHERE spaceId = '${spaceId}'
     AND networkId = '${networkId}'
     AND accountId = '${accountId}';
  `;

  await execute(query);
};
