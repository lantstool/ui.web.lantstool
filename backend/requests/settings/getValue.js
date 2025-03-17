import { addPrefixToObjKeys } from '../helpers/addPrefixToObjKeys.js';

export const getValue = async ({ execute, request }) => {
  const query = `
    SELECT value FROM settings 
    WHERE key = @key
  `;
  const [{ value }] = await execute(query, addPrefixToObjKeys(request.body));

  return JSON.parse(value);
};
