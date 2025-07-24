import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';

export const removeAll= async ({ execute, request }) => {
  const { spaceId, networkId } = request.body;

  const query = `
    DELETE FROM near_protocol_folders
    WHERE spaceId = @spaceId
      AND networkId = @networkId
  `;

  await execute(query, addPrefixToObjKeys({ spaceId, networkId }));
};
