import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';

export const removeOne = async ({ execute, request }) => {
  const { spaceId, networkId, folderId, children } = request.body;

  // Step 1: Delete all transactions in this folder
  if (Array.isArray(children) && children.length > 0) {
    const txIds = children.map((tx) => `'${tx.transactionId}'`).join(', ');
    const deleteTxQuery = `
      DELETE FROM near_protocol_transactions
      WHERE transactionId IN (${txIds});
    `;
    await execute(deleteTxQuery);
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
