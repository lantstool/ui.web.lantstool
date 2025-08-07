import { v4 as uuid } from 'uuid';
import { getCount } from './getCount.js';
import { createCall } from './queries/createCall.js';
import { getUpdateOrderQuery } from './queries/getUpdateOrderQuery.js';
import { getListQuery } from './queries/getListQuery.js';
import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';

const updateList = async (execute, list) => {
  const updatedList = list.map((call) => ({
    ...call,
    order: call.order + 1,
  }));
  await execute(getUpdateOrderQuery(updatedList));
};

const updateFollowingCalls = async (execute, spaceId, networkId, order) => {
  const getListForOrderUpdate = `
    SELECT callId, name, "order", parentId
    FROM near_protocol_calls
    WHERE spaceId = @spaceId
      AND networkId = @networkId
      AND "order" >= @order
    ORDER BY "order" DESC;
`;

  const list = await execute(
    getListForOrderUpdate,
    addPrefixToObjKeys({ networkId, spaceId, order }),
  );

  if (list.length > 0) await updateList(execute, list);
};

export const createInFolder = async ({ execute, request }) => {
  const { spaceId, networkId, parentId, order, body } = request.body;
  const callId = uuid();
  const createdAt = Date.now();
  const count = await getCount({ execute, request });
  const name = `Call#${count + 1}`;

  await updateFollowingCalls(execute, spaceId, networkId, order);

  await execute(
    createCall,
    addPrefixToObjKeys({
      callId,
      spaceId,
      networkId,
      name,
      order,
      createdAt,
      editedAt: null,
      body: JSON.stringify(body),
      parentId,
    }),
  );

  return await execute(getListQuery, addPrefixToObjKeys(request.body));
};
