import { addPrefixToObjKeys } from '../helpers/addPrefixToObjKeys.js';

export const getOne = async ({ execute, request }) => {
  const query = `
    SELECT * FROM spaces
    WHERE spaceId = @spaceId 
    `;

  const [space] = await execute(query, addPrefixToObjKeys(request.body));
  return space;
};
