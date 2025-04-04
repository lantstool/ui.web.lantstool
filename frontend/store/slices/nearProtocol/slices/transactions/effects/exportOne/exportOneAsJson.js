import { effect } from '@react-vault';
import { transformTxForExport } from './helpers/transformTxForExport.js';
import { getFormattedJSON } from '../../../../../../helpers/utils.js';

export const exportOneAsJson = effect(async ({ store, payload }) => {
  const { origin: transaction, form, setData } = payload;
  const json = await transformTxForExport(transaction, form.getValues(), store);
  const formatedJson = getFormattedJSON(json);
  setData(formatedJson);
});
