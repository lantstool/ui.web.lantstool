import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';

export const getIds = async ({ execute, request }) => {
  const query = `
    SELECT publicKey FROM near_protocol_keys
    WHERE spaceId = @spaceId 
      AND networkId = @networkId
    ORDER BY createdAt
  `;

  const keys = await execute(query, addPrefixToObjKeys(request.body));
  return keys.map((account) => account.publicKey);
};
