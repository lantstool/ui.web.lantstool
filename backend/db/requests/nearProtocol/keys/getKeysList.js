export const getKeyList = async ({ execute, request }) => {
  const { spaceId, networkId } = request.body;

  const query = `
    SELECT publicKey, createdAt FROM near_protocol_keys
    WHERE spaceId = '${spaceId}' AND networkId = '${networkId}'
    ORDER BY createdAt
  `;

  return await execute(query);
};
