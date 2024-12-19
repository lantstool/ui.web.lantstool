export const create = async ({ execute, request }) => {
  const { accountId, spaceId, networkId, note } = request.body;
  const createdAt = Date.now();

  const query = `
    INSERT INTO near_protocol_accounts 
      (accountId, spaceId, networkId, note, createdAt)
    VALUES('${accountId}', '${spaceId}', '${networkId}', '${note}', ${createdAt})
    RETURNING *;
  `;

  const [account] = await execute(query);
  return account;
};
