import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';

export const updateOneName = async ({ execute, request }) => {
  const query = `
    UPDATE near_protocol_calls
    SET name = @name
    WHERE callId = @callId
  `;

  await execute(query, addPrefixToObjKeys(request.body));
};
