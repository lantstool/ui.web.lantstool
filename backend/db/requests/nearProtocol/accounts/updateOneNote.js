export const updateOneNote = async ({ execute, request }) => {
  const { spaceId, networkId, accountId, note } = request.body;

  const query = `
    UPDATE near_protocol_accounts
    SET note = '${note}'
    WHERE spaceId = '${spaceId}'
     AND networkId = '${networkId}'
     AND accountId = '${accountId}';
  `;

  await execute(query);
};
