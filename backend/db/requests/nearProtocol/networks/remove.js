export const remove = async ({ execute, request }) => {
  const { spaceId, networkId} = request.body;

  const query = `
    DELETE FROM near_protocol_networks
    WHERE spaceId = '${spaceId}' AND networkId = '${networkId}';
  `;

  await execute(query);
};
