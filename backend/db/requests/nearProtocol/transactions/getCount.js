import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';

export const getCount = async ({ execute, request }) => {
  const query = `
    SELECT transactions FROM near_protocol_counters
    WHERE spaceId = @spaceId AND networkId = @networkId;
  `;

  const [{ transactions }] = await execute(query, addPrefixToObjKeys(request.body));
  return transactions;
};
