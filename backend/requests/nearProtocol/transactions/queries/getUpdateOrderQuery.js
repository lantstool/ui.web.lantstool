/*
  getUpdateOrderQuery generates a query like:

  UPDATE near_protocol_transactions
  SET "order" = CASE
    WHEN transactionId = 'tx1' THEN 1
    WHEN transactionId = 'tx2' THEN 2
    WHEN transactionId = 'tx3' THEN 3
    ELSE "order"
  END
   "parentId" = CASE
      WHEN transactionId = 'tx1' THEN 'folder1'
      WHEN transactionId = 'tx2' THEN NULL
      ELSE "parentId"
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

  const part3 = `ELSE "order" END, "parentId" = CASE`;

  const part4 = list
    .map(
      ({ transactionId, parentId }) =>
        ` WHEN transactionId = '${transactionId}' THEN ${parentId ? `'${parentId}'` : 'NULL'}`,
    )
    .join('');

  const part5 = `ELSE "parentId" END WHERE transactionId IN`;

  const part6 = `(${list.map(({ transactionId }) => `'${transactionId}'`).join(', ')})`;

  return `${part1}${part2} ${part3}${part4} ${part5} ${part6}`;
};
