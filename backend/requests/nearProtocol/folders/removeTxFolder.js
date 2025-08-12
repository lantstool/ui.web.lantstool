import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';
import { removeOne as removeTx } from '../transactions/removeOne.js';

export const removeTxFolder = async ({ execute, request }) => {
  const { spaceId, networkId, folderId, children } = request.body;

  // Step 1: Delete all transactions in this folder
  for (const { transactionId } of children) {
    await removeTx({
      execute,
      request: { body: { spaceId, networkId, transactionId } },
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
