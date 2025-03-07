import { addPrefixToObjKeys } from '../helpers/addPrefixToObjKeys.js';

export const updateOneName = async ({ execute, request }) => {
  const query = `
    UPDATE spaces
    SET name = @name
    WHERE spaceId = @spaceId
  `;
  await execute(query, addPrefixToObjKeys(request.body));
};
