import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';

export const updateOneBody = async ({ execute, request }) => {
  const { callId, body } = request.body;

  const query = `
    UPDATE near_protocol_calls
    SET body = @body
    WHERE callId = @callId
    RETURNING *;
  `;

  const [call] = await execute(
    query,
    addPrefixToObjKeys({
      body: JSON.stringify(body),
      callId,
    }),
  );

  call.body = JSON.parse(call.body);
  return call;
};
