import { getListQuery } from './helpers/getListQuery.js';

/*
  getReorderQuery generates a query like:
  UPDATE near_protocol_transactions
  SET "order" = CASE
    WHEN transactionId = 'tx1' THEN 1
    WHEN transactionId = 'tx2' THEN 2
    WHEN transactionId = 'tx3' THEN 3
    ELSE "order"
  END
  WHERE transactionId IN ('tx1', 'tx2', 'tx3');
*/

const getReorderQuery = (list) => {
  const part1 = `UPDATE near_protocol_transactions SET "order" = CASE`;

  const part2 = list.reduce(
    (acc, { transactionId }, index) =>
      `${acc} WHEN transactionId = '${transactionId}' THEN ${index}`,
    ``,
  );

  const part3 = `ELSE "order" END WHERE transactionId IN`;

  const part4 = list.reduce((acc, { transactionId }, index) => {
    if (index === 0) return `('${transactionId}',`;
    if (index === list.length - 1) return `${acc} '${transactionId}')`;
    return `${acc} '${transactionId}',`;
  }, ``);

  return `${part1} ${part2}  ${part3}  ${part4}`;
};

export const reorder = async ({ execute, request }) => {
  const { spaceId, networkId, reorderedList } = request.body;
  await execute(getReorderQuery(reorderedList));
  return await execute(getListQuery(spaceId, networkId));
};
