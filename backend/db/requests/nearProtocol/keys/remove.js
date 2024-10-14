export const remove = async ({ execute, request }) => {
  const { spaceId, networkId, publicKey } = request.body;

  const query = `
    DELETE FROM near_protocol_keys
    WHERE spaceId = '${spaceId}' 
      AND networkId = '${networkId}'
      AND publicKey = '${publicKey}'
  `;

  await execute(query);
};
