import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';
import { getUpdateOrderQuery } from './queries/getUpdateOrderQuery.js';
import { getListQuery } from './queries/getListQuery.js';
import { getListForOrderUpdate } from './queries/getListForOrderUpdate.js';
import { v4 as uuid } from 'uuid';

const updateList = async (execute, list) => {
  const updatedList = list.map((call) => ({
    ...call,
    order: call.order + 1,
  }));
  await execute(getUpdateOrderQuery(updatedList));
};

// Get the Call data we want to duplicate
const getTarget = async (execute, callId) => {
  const query = `
    SELECT * FROM near_protocol_calls
    WHERE callId = @callId;
  `;
  const [call] = await execute(query, addPrefixToObjKeys({ callId }));
  return call;
};

const getDuplicateName = async (execute, name) => {
  // get origin name without a ` - copy` suffix
  const originName = name.replace(/ - copy(\(\d+\))?$/, '');

  const query = `
    SELECT COUNT(*) as count
    FROM near_protocol_calls
    WHERE name LIKE @originName;
  `;
  const [{ count }] = await execute(query, { '@originName': `%${originName}%` });

  if (count === 1) return `${originName} - copy`;
  return `${originName} - copy(${count - 1})`;
};

const duplicate = async (execute, targetId) => {
  const target = await getTarget(execute, targetId);
  const callId = uuid();
  const name = await getDuplicateName(execute, target.name);
  const createdAt = Date.now();

  const query = `
    INSERT INTO near_protocol_calls
      VALUES(
        @callId,
        @networkId,
        @spaceId,
        @name,
        @order,
        @createdAt,
        @editedAt,
        @body
      )
  `;

  await execute(
    query,
    addPrefixToObjKeys({
      callId,
      networkId: target.networkId,
      spaceId: target.spaceId,
      name,
      order: target.order + 1,
      createdAt,
      editedAt: null,
      body: target.body,
    }),
  );
};

export const duplicateOne = async ({ execute, request }) => {
  const { spaceId, networkId, targetId } = request.body;
  // Get all calls we have to do an order update
  const listForUpdate = await execute(
    getListForOrderUpdate,
    addPrefixToObjKeys({
      spaceId,
      networkId,
      callId: targetId,
    }),
  );
  // When we duplicate the last tx there is no calls to update and query will fail
  if (listForUpdate.length > 0) await updateList(execute, listForUpdate);
  // Create a target copy with updated name
  await duplicate(execute, targetId);
  // We want to return the updated list in order to avoid extra steps during the state update
  return await execute(getListQuery, addPrefixToObjKeys(request.body));
};
