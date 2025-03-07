import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';
import { queries } from './queries/queries.js';

export const getList = async ({ execute, request }) =>
  await execute(queries.getTransactions, addPrefixToObjKeys(request.body));
