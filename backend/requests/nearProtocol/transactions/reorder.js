import { queries } from './queries/queries.js';

export const reorder = async ({ execute, request }) => {
  const { reorderedTxList } = request.body;

  await execute(queries.getUpdateOrderQuery(reorderedTxList));
};
