import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';

export const getKeyList = async ({ execute, request }) => {
  const query = `
    SELECT publicKey, createdAt FROM near_protocol_keys
    WHERE spaceId =  @spaceId 
      AND networkId = @networkId
    ORDER BY createdAt
  `;

  return await execute(query, addPrefixToObjKeys(request.body));
};
