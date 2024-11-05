
export const getPublicKey = async ({ execute, request }) => {
  const query = `
    SELECT * FROM near_protocol_keys
    WHERE spaceId = '${request.body.spaceId}' 
      AND networkId = '${request.body.networkId}'
      AND publicKey = '${request.body.publicKey}'
  `;
  const [key] = await execute(query);
  return key;
};
