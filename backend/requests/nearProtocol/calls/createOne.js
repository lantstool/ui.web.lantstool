import { v4 as uuid } from 'uuid';
import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';
import { getCount } from './getCount.js';
import { getNewCallOrder } from './helpers/getNewCallOrder.js';
import { createCall } from './queries/createCall.js';

export const createOne = async ({ execute, request }) => {
  const { spaceId, networkId, body } = request.body;

  const callId = uuid();
  const createdAt = Date.now();
  const order = await getNewCallOrder(execute, spaceId, networkId);
  const count = await getCount({ execute, request });
  const name = `Call#${count + 1}`;

  const [call] = await execute(
    createCall,
    addPrefixToObjKeys({
      callId,
      networkId,
      spaceId,
      name,
      order,
      createdAt,
      editedAt: null,
      body: JSON.stringify(body),
      parentId: null,
    }),
  );

  call.body = JSON.parse(call.body);
  return call;
};
