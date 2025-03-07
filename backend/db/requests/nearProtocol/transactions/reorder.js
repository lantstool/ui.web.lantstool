import { queries } from './queries/queries.js';

export const reorder = async ({ execute, request }) => {
  const { reorderedList } = request.body;
  await execute(queries.getUpdateOrderQuery(reorderedList));
};
