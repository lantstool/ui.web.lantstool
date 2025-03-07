import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';

export const remove = async ({ execute, request }) => {
  const query = `
    DELETE FROM near_protocol_accounts
    WHERE spaceId = @spaceId
     AND networkId = @networkId
     AND accountId = @accountId;
  `;

  await execute(query, addPrefixToObjKeys(request.body));
};
