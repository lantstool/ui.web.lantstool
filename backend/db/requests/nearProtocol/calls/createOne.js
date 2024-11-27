import { v4 as uuid } from 'uuid';
import { getCount } from './getCount.js';

const getNewCallOrder = async (execute, spaceId, networkId) => {
  const query = `
    SELECT COUNT(*) as 'order'
    FROM near_protocol_calls 
    WHERE spaceId = '${spaceId}' AND networkId = '${networkId}'
  `;
  const [{ order }] = await execute(query);
  return order;
};

export const createOne = async ({ execute, request }) => {
  const { spaceId, networkId } = request.body;
  const callId = uuid();
  const createdAt = Date.now();
  const order = await getNewCallOrder(execute, spaceId, networkId);
  const count = await getCount({ execute, request });
  const name = `Call#${count + 1}`;
  const rpcType = 'regular';

  const body = JSON.stringify({
    method: { value: 'getAccount', label: 'Get Account' },
    accountId: null,
    blockTarget: 'latest',
    finality: { value: 'final', label: 'Final' },
    blockId: '',
  });

  const query = `
    BEGIN TRANSACTION;
    
    INSERT INTO near_protocol_calls
      (callId, networkId, spaceId, name, 'order', createdAt, rpcType, body)
    VALUES(
      '${callId}', 
      '${networkId}', 
      '${spaceId}', 
      '${name}', 
       ${order}, 
       ${createdAt}, 
      '${rpcType}', 
      '${body}'
    )
    RETURNING *;
    
    UPDATE near_protocol_counters
    SET calls = calls + 1
    WHERE spaceId = '${spaceId}' AND networkId = '${networkId}';
    
    COMMIT;
  `;

  const [call] = await execute(query);
  call.body = JSON.parse(call.body);

  return call;
};
