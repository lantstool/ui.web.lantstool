import { v4 as uuid } from 'uuid';
import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';
import { getNewCallOrder } from './helpers/getNewCallOrder.js';
import { createCall } from './queries/createCall.js';

export const importOne = async ({ execute, request }) => {
  const { spaceId, networkId, name, body } = request.body;

  const callId = uuid();
  const createdAt = Date.now();
  const order = await getNewCallOrder(execute, spaceId, networkId);

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
    }),
  );
  call.body = JSON.parse(call.body);

  return call;
};
