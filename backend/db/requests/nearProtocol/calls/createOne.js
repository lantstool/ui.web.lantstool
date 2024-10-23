import { v4 as uuid } from 'uuid';

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
  const { spaceId, networkId, name } = request.body;
  const callId = uuid();
  const createdAt = Date.now();
  const order = await getNewCallOrder(execute, spaceId, networkId);

  const body = JSON.stringify({
    method: '',
    params: null,
  });

  const query = `
    BEGIN TRANSACTION;
    
    INSERT INTO near_protocol_calls
      (callId, networkId, spaceId, name, 'order', createdAt, body)
    VALUES(
      '${callId}', 
      '${networkId}', 
      '${spaceId}', 
      '${name}', 
       ${order}, 
       ${createdAt}, 
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
