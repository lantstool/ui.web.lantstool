/**
  getUpdateOrderQuery generates a query like:

  UPDATE near_protocol_calls
  SET "order" = CASE
    WHEN callId = 'call1' THEN 1
    WHEN callId = 'call2' THEN 2
    WHEN callId = 'call3' THEN 3
    ELSE "order"
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

  const part3 = `ELSE "order" END WHERE callId IN`;
  const part4 = `(${list.map(({ callId }) => `'${callId}'`).join(', ')})`;

  return `${part1}${part2} ${part3} ${part4}`;
};
