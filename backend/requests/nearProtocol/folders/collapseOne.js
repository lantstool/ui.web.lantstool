import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';

export const collapseOne = async ({ execute, request }) => {
  const query = `
    UPDATE near_protocol_folders
    SET collapsed = @collapsed
    WHERE folderId = @folderId
  `;

  await execute(query, addPrefixToObjKeys(request.body));
};
