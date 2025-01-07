import { effect } from '@react-vault';
import { transformTxForExport } from './helpers/transformTxForExport.js';
import { getFormattedJSON } from '../../../../../helpers/utils.js';

export const exportOneAsJson = effect(({ payload }) => {
  const { origin: transaction, form } = payload;
  // return getFormattedJSON(methods[method].exportTransformer({ call, form }));
  const res = transformTxForExport(transaction, form.getValues());
  console.log(res);
  return getFormattedJSON(res);
});
