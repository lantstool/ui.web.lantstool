export const updateOneBody = async ({ execute, request }) => {
  const { callId, body } = request.body;

  const query = `
    UPDATE near_protocol_calls
    SET body = '${JSON.stringify(body)}'
    WHERE callId = '${callId}'
  `;

  await execute(query);
};
