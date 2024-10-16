import { validateNetworkId } from '../networks/validateNetworkId.js';

export const validateCallId = async ({ execute, request }) => {
  // We also validate spaceId inside this function
  await validateNetworkId({ execute, request });

  const { spaceId, networkId, transactionId } = request.body;

  const query = `
    SELECT transactionId FROM near_protocol_transactions
    WHERE transactionId = '${transactionId}'
      AND networkId = '${networkId}'
      AND spaceId = '${spaceId}';
  `;

  const [transaction] = await execute(query);

  if (!transaction) {
    const error = new Error();
    error.message =
      `In space '${spaceId}' and network '${networkId}' the transaction '${transactionId}' not found. ` +
      `Please verify the transaction ID and try again.`;
    error.code = 404;
    throw error;
  }
};
