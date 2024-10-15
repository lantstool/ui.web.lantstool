export const getCount = async ({ execute, request }) => {
  const { spaceId, networkId } = request.body;

  const query = `
    SELECT calls FROM near_protocol_counters
    WHERE spaceId = '${spaceId}' AND networkId = '${networkId}';
  `;

  const [{ calls }] = await execute(query);
  return calls;
};
