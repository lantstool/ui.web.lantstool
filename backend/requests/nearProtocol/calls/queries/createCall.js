export const createCall = `
  BEGIN TRANSACTION;
  
  INSERT INTO near_protocol_calls
    VALUES(
      @callId, 
      @networkId, 
      @spaceId, 
      @name, 
      @order, 
      @createdAt, 
      @editedAt,
      @body,
      @parentId
    )
  RETURNING *;
  
  UPDATE near_protocol_counters
  SET calls = calls + 1
  WHERE spaceId = @spaceId AND networkId = @networkId;
  
  COMMIT;
`;
