export const createCall = ({ spaceId, networkId, callId, name, order, createdAt, body }) => `
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
