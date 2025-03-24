import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';
import { getListQuery } from './queries/getListQuery.js';

export const getList = async ({ execute, request }) =>
  await execute(getListQuery, addPrefixToObjKeys(request.body));
