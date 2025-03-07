import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';

export const create = async ({ execute, request }) => {
  const { accountId, spaceId, networkId, note } = request.body;
  const createdAt = Date.now();

  const query = `
    INSERT INTO near_protocol_accounts 
      VALUES(
        @accountId,
        @networkId,
        @spaceId, 
        @note, 
        @createdAt
      )
    RETURNING *;
  `;

  const [account] = await execute(
    query,
    addPrefixToObjKeys({
      accountId,
      spaceId,
      networkId,
      note,
      createdAt,
    }),
  );
  return account;
};
