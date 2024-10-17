export const getOne = async ({ execute, request }) => {
  const callId = request.body;

  const query = `
    SELECT callId, name, createdAt, body 
    FROM near_protocol_calls
    WHERE callId = '${callId}';
  `;
  const [call] = await execute(query);

  call.body = JSON.parse(call.body);
  return call;
};
