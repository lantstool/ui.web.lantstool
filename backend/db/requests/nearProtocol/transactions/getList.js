import { getListQuery } from './helpers/getListQuery.js';

export const getList = async ({ execute, request }) => {
  const { spaceId, networkId } = request.body;
  const query = getListQuery(spaceId, networkId);
  return await execute(query);
};
