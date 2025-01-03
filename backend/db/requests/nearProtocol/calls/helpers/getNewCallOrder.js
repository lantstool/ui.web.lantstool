export const getNewCallOrder = async (execute, spaceId, networkId) => {
  const query = `
    SELECT COUNT(*) as 'order'
    FROM near_protocol_calls 
    WHERE spaceId = '${spaceId}' AND networkId = '${networkId}'
  `;
  const [{ order }] = await execute(query);
  return order;
};
