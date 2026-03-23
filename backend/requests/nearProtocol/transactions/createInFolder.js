import { v4 as uuid } from 'uuid';
import { getCount } from './getCount.js';
import { queries } from './queries/queries.js';
import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';

const updateList = async (execute, list) => {
  const updatedList = list.map((transaction) => ({
    ...transaction,
    order: transaction.order + 1,
  }));
  await execute(queries.getUpdateOrderQuery(updatedList));
};

const updateFollowingTransactions = async (execute, spaceId, networkId, order) => {
  const getListForOrderUpdate = `
    SELECT transactionId, name, "order", parentId
    FROM near_protocol_transactions
    WHERE spaceId = @spaceId
      AND networkId = @networkId
      AND "order" >= @order
    ORDER BY "order" DESC;
`;

  const list = await execute(
    getListForOrderUpdate,
    addPrefixToObjKeys({ networkId, spaceId, order }),
  );

  if (list.length > 0) await updateList(execute, list);
};

export const createInFolder = async ({ execute, request }) => {
  const { spaceId, networkId, parentId, order } = request.body;
  const transactionId = uuid();
  const createdAt = Date.now();
  const count = await getCount({ execute, request });
  const name = `Transaction#${count + 1}`;

  await updateFollowingTransactions(execute, spaceId, networkId, order);

  const body = JSON.stringify({
    signerId: null,
    signerKey: null,
    receiverId: null,
    actions: [],
  });

  await execute(
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
      parentId,
    }),
  );

  return await execute(queries.getTransactions, addPrefixToObjKeys(request.body));
};
