import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';

export const getOne = async ({ execute, request }) => {
  const query = `
    SELECT * 
    FROM near_protocol_calls
    WHERE callId = @callId;
  `;
  const [call] = await execute(query, addPrefixToObjKeys(request.body));

  call.body = JSON.parse(call.body);
  return call;
};
