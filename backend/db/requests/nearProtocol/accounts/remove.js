export const remove = async ({ execute, request }) => {
  const { spaceId, accountId } = request.body;
  const query = `
    DELETE FROM near_protocol_accounts
    WHERE spaceId = '${spaceId}' AND accountId = '${accountId}';
  `;

  await execute(query);
};
