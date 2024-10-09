import { getUpdateOrderQuery } from './queries/getUpdateOrderQuery.js';
import { getListQuery } from './queries/getListQuery.js';

// We need to update the order of all txs which have order > than the deleted one
// because we need to have a subsequent unique order of txs like 0, 1, 2, 3, 4, 5, not 0, 1, 3, 5
// because we use txs count as a tx order for the new tx
// Example: we have 6 txs, and we delete the 3rd one - we need to update the order of the 4th, 5th and 6th txs

// Get a list of all txs which goes after the target tx
const getListForUpdate = (execute, spaceId, networkId, transactionId) => {
  const query = `
    SELECT transactionId, name, "order"
    FROM near_protocol_transactions
    WHERE spaceId = '${spaceId}'
      AND networkId = '${networkId}'
      AND "order" > (
        SELECT "order"
        FROM near_protocol_transactions
        WHERE transactionId = '${transactionId}'
      )
    ORDER BY "order"
  `;
  return execute(query);
};

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

  const listForUpdate = await getListForUpdate(execute, spaceId, networkId, transactionId);
  // When we delete the last Tx there is no transactions to update and query will fail
  if (listForUpdate.length > 0) await updateList(execute, listForUpdate);
  await deleteTx(execute, transactionId);
  // We want to return the updated list and avoid extra steps during state update
  return await execute(getListQuery(spaceId, networkId));
};
