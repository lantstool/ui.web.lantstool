import { getListForOrderUpdateQuery } from './queries/getListForOrderUpdateQuery.js';
import { getUpdateOrderQuery } from './queries/getUpdateOrderQuery.js';
import { getListQuery } from './queries/getListQuery.js';

const updateList = async (execute, list) => {
  const updatedList = list.map((call) => ({
    ...call,
    order: call.order - 1,
  }));
  await execute(getUpdateOrderQuery(updatedList));
};

const deleteCall = async (execute, callId) => {
  const query = `
    DELETE FROM near_protocol_calls
    WHERE callId = '${callId}';
  `;
  await execute(query);
};

export const removeOne = async ({ execute, request }) => {
  const { spaceId, networkId, callId } = request.body;
  // Get all calls we have to do an order update
  const listForUpdate = await execute(getListForOrderUpdateQuery(spaceId, networkId, callId));
  // When we delete the last call there is no calls to update and query will fail
  if (listForUpdate.length > 0) await updateList(execute, listForUpdate);
  await deleteCall(execute, callId);
  // We want to return the updated list and avoid extra steps during state update
  return await execute(getListQuery(spaceId, networkId));
};
