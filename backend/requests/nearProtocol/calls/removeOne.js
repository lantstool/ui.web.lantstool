import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';
import { getListForOrderUpdate } from './queries/getListForOrderUpdate.js';
import { getUpdateOrderQuery } from './queries/getUpdateOrderQuery.js';
import { getListQuery } from './queries/getListQuery.js';

const updateList = async (execute, list) => {
  const updatedList = list.map((call) => ({
    ...call,
    order: call.order - 1,
  }));
  await execute(getUpdateOrderQuery(updatedList));
};

const deleteCall = async (execute, request) => {
  const query = `
    DELETE FROM near_protocol_calls
    WHERE callId = @callId;
  `;
  await execute(query, addPrefixToObjKeys(request.body));
};

export const removeOne = async ({ execute, request }) => {
  // Get all calls we have to do an order update
  const listForUpdate = await execute(getListForOrderUpdate, addPrefixToObjKeys(request.body));
  // When we delete the last call there is no calls to update and query will fail
  if (listForUpdate.length > 0) await updateList(execute, listForUpdate);
  await deleteCall(execute, request);
  // We want to return the updated list and avoid extra steps during state update
  return await execute(getListQuery, addPrefixToObjKeys(request.body));
};
