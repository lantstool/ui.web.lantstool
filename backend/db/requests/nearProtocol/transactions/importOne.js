import { v4 as uuid } from 'uuid';
import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';
import { getNewTransactionOrder } from './helpers/getNewTransactionOrder.js';
import { increaseContractUsage } from '../../helpers/updateContractUsage.js';
import { queries } from './queries/queries.js';

const updateContractUsage = ({ execute, contracts }) =>
  Promise.all(
    Object.entries(contracts).map(([fileName, { counter, u8File }]) =>
      increaseContractUsage({ execute, u8File, fileName, counter }),
    ),
  );

export const importOne = async ({ execute, request }) => {
  const { spaceId, networkId, body, name, contracts } = request.body;
  const transactionId = uuid();
  const createdAt = Date.now();
  const order = await getNewTransactionOrder(execute, spaceId, networkId);

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
      body: JSON.stringify(body),
    }),
  );

  transaction.body = JSON.parse(transaction.body);

  await updateContractUsage({ execute, contracts });

  return transaction;
};
