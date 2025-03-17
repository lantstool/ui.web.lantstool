import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';

export const remove = async ({ execute, request }) => {
  const query = `
    DELETE FROM near_protocol_keys
    WHERE spaceId = @spaceId
      AND networkId = @networkId
      AND publicKey = @publicKey;
  `;

  await execute(query, addPrefixToObjKeys(request.body));
};
