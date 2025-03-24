import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';

export const getOne = async ({ execute, request }) => {
  const query = `
    SELECT accountId, note, createdAt FROM near_protocol_accounts
    WHERE spaceId = @spaceId
     AND networkId = @networkId
     AND accountId = @accountId;
  `;
  const [account] = await execute(query, addPrefixToObjKeys(request.body));

  return account;
};
