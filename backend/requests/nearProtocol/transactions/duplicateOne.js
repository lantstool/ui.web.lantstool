import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';
import { updateContractUsage } from '../../helpers/updateContractUsage.js';
import { v4 as uuid } from 'uuid';
import { queries } from './queries/queries.js';

const updateList = async (execute, list) => {
  const updatedList = list.map((transaction) => ({
    ...transaction,
    order: transaction.order + 1,
  }));
  await execute(queries.getUpdateOrderQuery(updatedList));
};

// Get the Tx data we want to duplicate
const getTarget = async (execute, transactionId) => {
  const query = `
    SELECT * FROM near_protocol_transactions
    WHERE transactionId = @transactionId;
  `;
  const [transaction] = await execute(query, addPrefixToObjKeys({ transactionId }));
  return transaction;
};

const getDuplicateName = async (execute, name) => {
  // get origin name without a ` - copy` suffix
  const originName = name.replace(/ - copy(\(\d+\))?$/, '');

  const query = `
    SELECT COUNT(*) as count
    FROM near_protocol_transactions
    WHERE name LIKE @originName;
  `;
  const params = { '@originName': `%${originName}%` };

  const [{ count }] = await execute(query, params);

  if (count === 1) return `${originName} - copy`;
  return `${originName} - copy(${count - 1})`;
};

const duplicate = async (execute, targetId) => {
  const target = await getTarget(execute, targetId);
  const transactionId = uuid();
  const name = await getDuplicateName(execute, target.name);
  const createdAt = Date.now();

  const query = `
    INSERT INTO near_protocol_transactions
      VALUES(
        @transactionId,
        @networkId,
        @spaceId,
        @name,
        @order,
        @createdAt,
        @editedAt,
        @body
      )
  `;

  await execute(
    query,
    addPrefixToObjKeys({
      spaceId: target.spaceId,
      networkId: target.networkId,
      transactionId,
      name,
      order: target.order + 1,
      createdAt,
      editedAt: null,
      body: target.body,
    }),
  );
};

export const duplicateOne = async ({ execute, request }) => {
  const { spaceId, networkId, targetId } = request.body;
  // Get all transactions we have to do an order update
  const listForUpdate = await execute(
    queries.getListForOrderUpdate,
    addPrefixToObjKeys({
      spaceId,
      networkId,
      transactionId: targetId,
    }),
  );
  // When we duplicate the last tx there is no transactions to update and query will fail
  if (listForUpdate.length > 0) await updateList(execute, listForUpdate);
  // Create a target copy with updated name
  await duplicate(execute, targetId);

  // Update the contracts usage if it's present in the target transaction;
  // We do a trick here - if the tx has some Deploy Contract actions then we call
  // updateContractUsage with x2 Deploy Contract actions. And this will update usage
  // exactly in x2 times;
  const target = await getTarget(execute, targetId);
  const { actions } = JSON.parse(target.body);

  await updateContractUsage({
    execute,
    transactionId: targetId,
    body: { actions: [...actions, ...actions] },
  });

  // We want to return the updated list in order to avoid extra steps during the state update
  return await execute(queries.getTransactions, addPrefixToObjKeys(request.body));
};
