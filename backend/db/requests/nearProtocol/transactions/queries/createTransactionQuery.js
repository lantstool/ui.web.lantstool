export const createTransactionQuery = ({
  spaceId,
  networkId,
  transactionId,
  name,
  order,
  createdAt,
  body,
}) => `
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
