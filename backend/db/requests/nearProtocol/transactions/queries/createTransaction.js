export const createTransaction = `
  BEGIN TRANSACTION;
  
  INSERT INTO near_protocol_transactions
    VALUES(
     @transactionId, 
     @networkId, 
     @spaceId, 
     @name, 
     @order, 
     @createdAt, 
     @editedAt, 
     @body
    )
  RETURNING *;
  
  UPDATE near_protocol_counters
    SET transactions = transactions + 1
    WHERE spaceId = @spaceId AND networkId = @networkId;
  
  COMMIT;
`;
