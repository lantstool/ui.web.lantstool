import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';

export const updateOneNote = async ({ execute, request }) => {
  const query = `
    UPDATE near_protocol_accounts
    SET note = @note
    WHERE spaceId = @spaceId
      AND networkId = @networkId
      AND accountId = @accountId;
  `;

  await execute(query, addPrefixToObjKeys(request.body));
};
