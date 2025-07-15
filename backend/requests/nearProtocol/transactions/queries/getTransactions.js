// We use it to get a transactions list
export const getTransactions = `
  SELECT transactionId, name, parentId, "order" FROM near_protocol_transactions
  WHERE spaceId = @spaceId 
    AND networkId = @networkId
  ORDER BY "order";
`;
