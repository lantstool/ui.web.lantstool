export const updateOneName = async ({ execute, request }) => {
  const { callId, name } = request.body;

  const query = `
    UPDATE near_protocol_calls
    SET name = '${name}'
    WHERE callId = '${callId}'
  `;

  await execute(query);
};
