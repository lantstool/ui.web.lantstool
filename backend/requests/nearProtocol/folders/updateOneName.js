import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';

export const updateOneName = async ({ execute, request }) => {
  const query = `
    UPDATE near_protocol_folders
    SET name = @name
    WHERE folderId = @folderId
  `;

  await execute(query, addPrefixToObjKeys(request.body));
};
