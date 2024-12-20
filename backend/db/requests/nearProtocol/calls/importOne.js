import { v4 as uuid } from 'uuid';
import { getNewCallOrder } from './helpers/getNewCallOrder.js';
import { createCall } from './queries/createCall.js';

export const importOne = async ({ execute, request }) => {
  const { spaceId, networkId, name, body: objBody } = request.body;

  const callId = uuid();
  const createdAt = Date.now();
  const order = await getNewCallOrder(execute, spaceId, networkId);
  const body = JSON.stringify(objBody);

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
