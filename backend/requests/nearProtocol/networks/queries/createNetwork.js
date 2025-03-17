export const createNetwork = `
  BEGIN TRANSACTION;
  
  INSERT INTO near_protocol_networks
    VALUES(
      @networkId, 
      @spaceId, 
      @createdAt, 
      @activeRpc, 
      @rpcList
    )
  RETURNING *;
  
  INSERT INTO near_protocol_counters
    VALUES(
      @spaceId, 
      @networkId, 
      0, 
      0
    );
  
  COMMIT;
`
