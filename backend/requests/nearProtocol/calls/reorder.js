import { getUpdateOrderQuery } from './queries/getUpdateOrderQuery.js';

export const reorder = async ({ execute, request }) => {
  await execute(getUpdateOrderQuery(request.body.reorderedCallList));
};
