import { v4 as uuid } from 'uuid';
import { getCount } from './getCount.js';
import { queries } from './queries/queries.js';
import { getNewTransactionOrder } from './helpers/getNewTransactionOrder.js';
import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';

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

  const [transaction] = await execute(
    queries.createTransaction,
    addPrefixToObjKeys({
      transactionId,
      spaceId,
      networkId,
      name,
      order,
      createdAt,
      editedAt: null,
      body,
      parentId: null,
    }),
  );

  transaction.body = JSON.parse(transaction.body);
  return transaction;
};
