import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';
import { validateNetworkId } from '../networks/validateNetworkId.js';

export const validateCallId = async ({ execute, request }) => {
  // We also validate spaceId inside this function
  await validateNetworkId({ execute, request });

  const { spaceId, networkId, callId } = request.body;

  const query = `
    SELECT callId FROM near_protocol_calls
    WHERE callId = @callId
      AND networkId = @networkId
      AND spaceId = @spaceId;
  `;

  const [call] = await execute(query, addPrefixToObjKeys(request.body));

  if (!call) {
    const error = new Error();
    error.message =
      `In space '${spaceId}' and network '${networkId}' the call '${callId}' not found. ` +
      `Please verify the call ID and try again.`;
    error.code = 404;
    throw error;
  }
};
