export const create = async ({ execute, request }) => {
  const { accountId, spaceId, networkId, localName } = request.body;
  const createdAt = Date.now();

  const query = `
    INSERT INTO near_protocol_accounts 
      (accountId, spaceId, networkId, localName, createdAt)
    VALUES('${accountId}', '${spaceId}', '${networkId}', '${localName}', ${createdAt})
    RETURNING *;
  `;

  const [account] = await execute(query);
  return account;
};
