import { v4 as uuid } from 'uuid';
import { getCount } from './getCount.js';

const getNewTransactionOrder = async (execute, spaceId, networkId) => {
  const query = `
    SELECT COUNT(*) as 'order'
    FROM near_protocol_transactions 
    WHERE spaceId = '${spaceId}' AND networkId = '${networkId}'
  `;
  const [{ order }] = await execute(query);
  return order;
};

export const create = async ({ execute, request }) => {
  const { spaceId, networkId } = request.body;
  const transactionId = uuid();
  const createdAt = Date.now();
  const order = await getNewTransactionOrder(execute, spaceId, networkId);
  const count = await getCount({ execute, request });
  const name = `Transaction#${count + 1}`;

  const body = JSON.stringify({
    signerId: null,
    signerKey: null,
    receiverId: null,
    actions: [],
  });

  const query = `
    BEGIN TRANSACTION;
    
    INSERT INTO near_protocol_transactions
      (transactionId, networkId, spaceId, name, 'order', createdAt, body)
    VALUES(
      '${transactionId}', 
      '${networkId}', 
      '${spaceId}', 
      '${name}', 
       ${order}, 
       ${createdAt}, 
      '${body}'
    )
    RETURNING *;
    
    UPDATE near_protocol_counters
    SET transactions = transactions + 1
    WHERE spaceId = '${spaceId}' AND networkId = '${networkId}';
    
    COMMIT;
  `;

  const [transaction] = await execute(query);
  transaction.body = JSON.parse(transaction.body);

  return transaction;
};
