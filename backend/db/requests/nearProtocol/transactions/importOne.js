import { v4 as uuid } from 'uuid';
import { getNewTransactionOrder } from './helpers/getNewTransactionOrder.js';
import { createTransactionQuery } from './queries/createTransactionQuery.js';
import { increaseContractUsage } from '../../helpers/updateContractUsage.js';

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

  const query = createTransactionQuery({
    spaceId,
    networkId,
    transactionId,
    name,
    order,
    createdAt,
    body: JSON.stringify(body),
  });

  const [transaction] = await execute(query);
  transaction.body = JSON.parse(transaction.body);

  await updateContractUsage({ execute, contracts });

  return transaction;
};
