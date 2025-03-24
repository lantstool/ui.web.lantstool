import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';

export const updateOneName = async ({ execute, request }) => {
  const query = `
    UPDATE near_protocol_transactions
    SET name = @name
    WHERE transactionId = @transactionId
  `;

  await execute(query, addPrefixToObjKeys(request.body));
};
