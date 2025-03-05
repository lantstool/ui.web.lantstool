import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';

export const getIds = async ({ execute, request }) => {
  const query = `
    SELECT accountId FROM near_protocol_accounts
    WHERE spaceId = @spaceId 
      AND networkId = @networkId
  `;

  const accounts = await execute(query, addPrefixToObjKeys(request.body));
  return accounts.map((account) => account.accountId);
};
