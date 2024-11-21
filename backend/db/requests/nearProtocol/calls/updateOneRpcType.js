export const updateOneRpcType = async ({ execute, request }) => {
  const { callId, rpcType } = request.body;

  const query = `
    UPDATE near_protocol_calls
    SET rpcType = '${rpcType}'
    WHERE callId = '${callId}'
  `;

  await execute(query);
};
