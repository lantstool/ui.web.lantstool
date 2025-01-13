import { v4 as uuid } from 'uuid';
import { getCount } from './getCount.js';
import { getNewCallOrder } from './helpers/getNewCallOrder.js';
import { createCall } from './queries/createCall.js';

export const createOne = async ({ execute, request }) => {
  const { spaceId, networkId } = request.body;

  const callId = uuid();
  const createdAt = Date.now();
  const order = await getNewCallOrder(execute, spaceId, networkId);
  const count = await getCount({ execute, request });
  const name = `Call#${count + 1}`;

  // TODO move this logic to the effect
  const body = JSON.stringify({
    method: { value: 'getAccount', label: 'Get Account' },
    accountId: null,
    blockTarget: 'latest',
    finality: { value: 'final', label: 'Final' },
    blockId: '',
  });

  const query = createCall({
    spaceId,
    networkId,
    callId,
    createdAt,
    order,
    name,
    body,
  });

  const [call] = await execute(query);
  call.body = JSON.parse(call.body);

  return call;
};
