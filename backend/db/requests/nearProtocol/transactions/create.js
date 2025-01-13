import { v4 as uuid } from 'uuid';
import { getCount } from './getCount.js';
import { createTransactionQuery } from './queries/createTransactionQuery.js';
import { getNewTransactionOrder } from './helpers/getNewTransactionOrder.js';

export const create = async ({ execute, request }) => {
  const { spaceId, networkId } = request.body;
  const transactionId = uuid();
  const createdAt = Date.now();
  const order = await getNewTransactionOrder(execute, spaceId, networkId);
  const count = await getCount({ execute, request });
  const name = `Transaction#${count + 1}`;

  const body = JSON.stringify({
    signerId: null,
    signerKey: null,
    receiverId: null,
    actions: [],
  });

  const query = createTransactionQuery({
    spaceId,
    networkId,
    transactionId,
    name,
    order,
    createdAt,
    body,
  });

  const [transaction] = await execute(query);
  transaction.body = JSON.parse(transaction.body);

  return transaction;
};
