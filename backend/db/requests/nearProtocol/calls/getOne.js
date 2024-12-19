export const getOne = async ({ execute, request }) => {
  const callId = request.body;

  const query = `
    SELECT * 
    FROM near_protocol_calls
    WHERE callId = '${callId}';
  `;
  const [call] = await execute(query);

  call.body = JSON.parse(call.body);
  return call;
};
