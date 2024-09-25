export const getCount = async ({ execute, request }) => {
  const { spaceId, networkId } = request.body;

  const query = `
    SELECT transactions FROM near_protocol_counters
    WHERE spaceId = '${spaceId}' AND networkId = '${networkId}';
  `;

  const [{ transactions }] = await execute(query);
  return transactions;
};
