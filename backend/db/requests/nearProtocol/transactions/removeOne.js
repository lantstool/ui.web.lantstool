import { getListForOrderUpdateQuery } from './queries/getListForOrderUpdateQuery.js';
import { getUpdateOrderQuery } from './queries/getUpdateOrderQuery.js';
import { getListQuery } from './queries/getListQuery.js';
import { updateContractUsage } from '../../helpers/updateContractUsage.js';

const updateList = async (execute, list) => {
  const updatedList = list.map((transaction) => ({
    ...transaction,
    order: transaction.order - 1,
  }));
  await execute(getUpdateOrderQuery(updatedList));
};

const deleteTx = async (execute, transactionId) => {
  const query = `
    DELETE FROM near_protocol_transactions
    WHERE transactionId = '${transactionId}';
  `;
  await execute(query);
};

export const removeOne = async ({ execute, request }) => {
  const { spaceId, networkId, transactionId } = request.body;
  // Get all transactions we have to do an order update
  const listForUpdate = await execute(
    getListForOrderUpdateQuery(spaceId, networkId, transactionId),
  );
  // When we delete the last Tx there is no transactions to update and query will fail
  if (listForUpdate.length > 0) await updateList(execute, listForUpdate);
  // We have to update the WASM usage if the tx has any DeployContract actions;
  await updateContractUsage({ execute, transactionId, body: { actions: [] } });
  // Delete tx itself
  await deleteTx(execute, transactionId);
  // We want to return the updated list and avoid extra steps during state update
  return await execute(getListQuery(spaceId, networkId));
};
