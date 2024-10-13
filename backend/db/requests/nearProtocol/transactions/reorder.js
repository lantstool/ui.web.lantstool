import { getUpdateOrderQuery } from './queries/getUpdateOrderQuery.js';

export const reorder = async ({ execute, request }) => {
  const { reorderedList } = request.body;
  await execute(getUpdateOrderQuery(reorderedList));
};
