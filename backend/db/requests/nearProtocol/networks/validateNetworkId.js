import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';
import { validateSpaceId } from '../../spaces/validateSpaceId.js';

export const validateNetworkId = async ({ execute, request }) => {
  await validateSpaceId({ execute, request });

  const { spaceId, networkId } = request.body;

  const query = `
    SELECT networkId FROM near_protocol_networks
    WHERE spaceId = @spaceId
      AND networkId = @networkId
  `;

  const [network] = await execute(query, addPrefixToObjKeys(request.body));

  if (!network) {
    const error = new Error();
    error.message =
      `In space '${spaceId}' the network '${networkId}' not found. ` +
      `Please verify the network ID and try again.`;
    error.code = 404;
    throw error;
  }
};
