import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';
import { removeOne as removeCall } from '../calls/removeOne.js';

export const removeCallFolder = async ({ execute, request }) => {
  const { spaceId, networkId, folderId, children } = request.body;

  // Step 1: Delete all transactions in this folder
  for (const { callId } of children) {
    await removeCall({
      execute,
      request: { body: { spaceId, networkId, callId } },
    });
  }

  // Step 2: Delete the folder
  const deleteFolderQuery = `
    DELETE FROM near_protocol_folders
    WHERE spaceId = @spaceId
      AND networkId = @networkId
      AND folderId = @folderId;
  `;

  await execute(deleteFolderQuery, addPrefixToObjKeys({ spaceId, networkId, folderId }));
};
