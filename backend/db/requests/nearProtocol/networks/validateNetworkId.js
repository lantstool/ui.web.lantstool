import { validateSpaceId } from '../../spaces/validateSpaceId.js';

export const validateNetworkId = async ({ execute, request }) => {
  await validateSpaceId({ execute, request });

  const { spaceId, networkId } = request.body;

  const query = `
    SELECT networkId FROM near_protocol_networks
    WHERE networkId = '${networkId}'
      AND spaceId = '${spaceId}';
  `;

  const [network] = await execute(query);

  if (!network) {
    const error = new Error();
    error.message =
      `In space '${spaceId}' the network '${networkId}' not found. ` +
      `Please verify the network ID and try again.`;
    error.code = 404;
    throw error;
  }
};
