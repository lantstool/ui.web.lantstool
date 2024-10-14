import { validateNetworkId } from '../networks/validateNetworkId.js';

export const validatePublicKey = async ({ execute, request }) => {
  // We also validate spaceId inside this function
  await validateNetworkId({ execute, request });

  const { spaceId, networkId, publicKey } = request.body;

  const query = `
    SELECT publicKey FROM near_protocol_keys
    WHERE publicKey = '${publicKey}'
      AND networkId = '${networkId}'
      AND spaceId = '${spaceId}';
  `;

  const [key] = await execute(query);

  if (!key) {
    const error = new Error();
    error.message =
      `In space '${spaceId}' and network '${networkId}' the key '${publicKey}' not found. ` +
      `Please verify the key and try again.`;
    error.code = 404;
    throw error;
  }
};
