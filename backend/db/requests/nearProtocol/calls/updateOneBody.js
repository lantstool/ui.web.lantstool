export const updateOneBody = async ({ execute, request }) => {
  const { callId, body } = request.body;

  const query = `
    UPDATE near_protocol_calls
    SET body = '${JSON.stringify(body)}'
    WHERE callId = '${callId}'
    RETURNING *;
  `;

  const [call] = await execute(query);
  call.body = JSON.parse(call.body);
  return call;
};
