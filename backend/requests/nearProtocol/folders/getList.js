import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';

export const getList = async ({ execute, request }) => {
  const query = `
    SELECT folderId, name, type, collapsed FROM near_protocol_folders
    WHERE spaceId =  @spaceId 
      AND networkId = @networkId
      AND type = @type
  `;

  return await execute(query, addPrefixToObjKeys(request.body));
};
