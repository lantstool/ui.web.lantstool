import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';

export const getAll = async ({ execute, request }) => {
  const query = `
    SELECT * FROM near_protocol_accounts
    WHERE spaceId = @spaceId
      AND networkId = @networkId
  `;

  return await execute(query, addPrefixToObjKeys(request.body));
};
