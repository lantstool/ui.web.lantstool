export const getAll = async ({ execute, request }) => {
  const query = `
    SELECT * FROM near_protocol_networks
    WHERE spaceId = '${request.body.spaceId}';
  `;
  return await execute(query);
};
