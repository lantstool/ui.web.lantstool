export const getIds = async ({ execute, request }) => {
  const { spaceId, networkId } = request.body;

  const query = `
    SELECT publicKey FROM near_protocol_keys
    WHERE spaceId = '${spaceId}' AND networkId = '${networkId}'
    ORDER BY createdAt
  `;

  const keys = await execute(query);
  return keys.map((account) => account.publicKey);
};
