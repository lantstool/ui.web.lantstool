import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';
import { validateNetworkId } from '../networks/validateNetworkId.js';

export const validateAccountId = async ({ execute, request }) => {
  // We also validate spaceId inside this function
  await validateNetworkId({ execute, request });

  const { spaceId, networkId, accountId } = request.body;

  const query = `
    SELECT accountId FROM near_protocol_accounts
    WHERE accountId = @accountId
      AND networkId = @networkId
      AND spaceId = @spaceId;
  `;

  const [account] = await execute(query, addPrefixToObjKeys(request.body));

  if (!account) {
    const error = new Error();
    error.message =
      `In space '${spaceId}' and network '${networkId}' the account '${accountId}' not found. ` +
      `Please verify the account ID and try again.`;
    error.code = 404;
    throw error;
  }
};
