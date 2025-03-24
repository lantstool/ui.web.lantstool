import { addPrefixToObjKeys } from '../helpers/addPrefixToObjKeys.js';

export const updateOneBadge = async ({ execute, request }) => {
  const query = `
    UPDATE spaces
    SET badge = @badge
    WHERE spaceId = @spaceId
  `;
  await execute(query, addPrefixToObjKeys(request.body));
};
