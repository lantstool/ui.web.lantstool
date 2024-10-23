export const updateOneNote= async ({ execute, request }) => {
  const { accountId, note } = request.body;

  const query = `
    UPDATE near_protocol_accounts
    SET note = '${note}'
    WHERE accountId = '${accountId}'
  `;

  await execute(query);
};