import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';

// TODO Unite with getOne
export const getPublicKey = async ({ execute, request }) => {
  const query = `
    SELECT * FROM near_protocol_keys
    WHERE spaceId = @spaceId
      AND networkId = @networkId
      AND publicKey = @publicKey;
  `;

  const [key] = await execute(query, addPrefixToObjKeys(request.body));

  return key;
};
