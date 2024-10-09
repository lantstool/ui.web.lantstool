/*
  getUpdateOrderQuery generates a query like:

  UPDATE near_protocol_transactions
  SET "order" = CASE
    WHEN transactionId = 'tx1' THEN 1
    WHEN transactionId = 'tx2' THEN 2
    WHEN transactionId = 'tx3' THEN 3
    ELSE "order"
  END
  WHERE transactionId IN ('tx1', 'tx2', 'tx3');

  We use it for update transactions order during reorder / remove tx operations
*/

export const getUpdateOrderQuery = (list) => {
  if (!list) throw new Error('Can`t reorder empty list');

  const part1 = `UPDATE near_protocol_transactions SET "order" = CASE`;

  const part2 = list
    .map(({ transactionId, order }) => ` WHEN transactionId = '${transactionId}' THEN ${order}`)
    .join('');

  const part3 = `ELSE "order" END WHERE transactionId IN`;
  const part4 = `(${list.map(({ transactionId }) => `'${transactionId}'`).join(', ')})`;

  return `${part1}${part2} ${part3} ${part4}`;
};
