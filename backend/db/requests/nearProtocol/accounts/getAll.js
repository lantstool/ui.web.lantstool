export const getAll = async ({ execute, request }) => {
  const { spaceId, networkId } = request.body;

  const query = `
    SELECT * FROM near_protocol_accounts
    WHERE spaceId = '${spaceId}' AND networkId = '${networkId}'
  `;

  return await execute(query);
};
