import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';
import { validateNetworkId } from '../networks/validateNetworkId.js';

export const validatePublicKey = async ({ execute, request }) => {
  // We also validate spaceId inside this function
  await validateNetworkId({ execute, request });

  const { spaceId, networkId, publicKey } = request.body;

  const query = `
    SELECT publicKey FROM near_protocol_keys
    WHERE spaceId = @spaceId
      AND networkId = @networkId
      AND publicKey = @publicKey;
  `;

  const [key] = await execute(query, addPrefixToObjKeys(request.body));

  if (!key) {
    const error = new Error();
    error.message =
      `In space '${spaceId}' and network '${networkId}' the key '${publicKey}' not found. ` +
      `Please verify the key and try again.`;
    error.code = 404;
    throw error;
  }
};
