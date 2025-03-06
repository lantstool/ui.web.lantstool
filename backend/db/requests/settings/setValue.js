import { addPrefixToObjKeys } from '../helpers/addPrefixToObjKeys.js';

export const setValue = async ({ execute, request }) => {
  const { key, value } = request.body;

  const query = `
    UPDATE settings SET value = @value
    WHERE key = @key
  `;

  await execute(
    query,
    addPrefixToObjKeys({
      key,
      value: JSON.stringify(value),
    }),
  );
};
