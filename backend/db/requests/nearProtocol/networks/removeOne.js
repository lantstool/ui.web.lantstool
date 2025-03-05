import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';
import { removeOne as removeTx } from '../transactions/removeOne.js';
import { getList as getTxList } from '../transactions/getList.js';

// We remove all tx manually in order to delete all contract files of the network
const removeAllTransactions = async (execute, spaceId, networkId) => {
  const list = await getTxList({ execute, request: { body: { spaceId, networkId } } });

  for (const { transactionId } of list) {
    await removeTx({
      execute,
      request: { body: { spaceId, networkId, transactionId } },
    });
  }
};

export const removeOne = async ({ execute, request }) => {
  const { spaceId, networkId } = request.body;

  await removeAllTransactions(execute, spaceId, networkId);

  const query = `
    DELETE FROM near_protocol_networks
    WHERE spaceId = @spaceId
      AND networkId = @networkId
  `;

  await execute(query, addPrefixToObjKeys(request.body));
};
