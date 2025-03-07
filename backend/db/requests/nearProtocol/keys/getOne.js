import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';

export const getOne = async ({ execute, request }) => {
  const query = `
    SELECT * FROM near_protocol_keys
    WHERE spaceId = @spaceId 
      AND networkId = @networkId
      AND publicKey = @publicKey;
  `;

  const [key] = await execute(query, addPrefixToObjKeys(request.body));

  // TODO Remove after migration - we have to update all keys and replace all ` on '
  key.derivationPath = key.derivationPath.replaceAll('`', "'");

  return key;
};
