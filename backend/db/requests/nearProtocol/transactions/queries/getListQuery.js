// We use it to get a transactions list
export const getListQuery = (spaceId, networkId) => `
  SELECT transactionId, name, "order" FROM near_protocol_transactions
  WHERE spaceId = '${spaceId}' AND networkId = '${networkId}'
  ORDER BY "order";
`;
