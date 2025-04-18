import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';

export const isOne = async ({ execute, request }) => {
  const query = `
    SELECT * FROM near_protocol_networks
    WHERE spaceId = @spaceId
      AND networkId = @networkId
  `;

  const [network] = await execute(query, addPrefixToObjKeys(request.body));
  return Boolean(network);
};
