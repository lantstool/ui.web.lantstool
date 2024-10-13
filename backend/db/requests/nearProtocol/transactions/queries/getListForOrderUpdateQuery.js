// We need to update the order of all txs which have order > than the added one
// because we need to have a subsequent unique order of txs
// like 0, 1, 2, 3, 4, 5, not 0, 1, 3, 5
// because we use txs count as a tx order for the new tx
// Example: we have 6 txs, and we delete the 3rd one -
// we need to update the order of the 4th, 5th and 6th txs

export const getListForOrderUpdateQuery = (spaceId, networkId, transactionId) => `
  SELECT transactionId, name, "order"
  FROM near_protocol_transactions
  WHERE spaceId = '${spaceId}'
    AND networkId = '${networkId}'
    AND "order" > (
      SELECT "order"
      FROM near_protocol_transactions
      WHERE transactionId = '${transactionId}'
    )
  ORDER BY "order"
`;
