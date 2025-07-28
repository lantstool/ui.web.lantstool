/**
  getUpdateOrderQuery generates a query like:

  UPDATE near_protocol_calls
  SET "order" = CASE
    WHEN callId = 'call1' THEN 1
    WHEN callId = 'call2' THEN 2
    WHEN callId = 'call3' THEN 3
    ELSE "order"
  END
  "parentId" = CASE
  WHEN transactionId = 'tx1' THEN 'folder1'
  WHEN transactionId = 'tx2' THEN NULL
  ELSE "parentId"
  END
  WHERE callId IN ('call1', 'call2', 'call3');

  We use it for update calls order during reorder / remove call operations
*/

export const getUpdateOrderQuery = (list) => {
  if (!list) throw new Error('Can`t reorder empty list');

  const part1 = `UPDATE near_protocol_calls SET "order" = CASE`;

  const part2 = list
    .map(({ callId, order }) => ` WHEN callId = '${callId}' THEN ${order}`)
    .join('');

  const part3 = `ELSE "order" END, "parentId" = CASE`;

  const part4 = list
    .map(
      ({ callId, parentId }) =>
        ` WHEN callId = '${callId}' THEN ${parentId ? `'${parentId}'` : 'NULL'}`,
    )
    .join('');

  const part5 = `ELSE "parentId" END WHERE callId IN`;

  const part6 = `(${list.map(({ callId }) => `'${callId}'`).join(', ')})`;

  return `${part1}${part2} ${part3}${part4} ${part5} ${part6}`;
};
