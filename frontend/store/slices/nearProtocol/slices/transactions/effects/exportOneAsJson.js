import { effect } from '@react-vault';
import { getFormattedJSON } from '../../../../../helpers/utils.js';

export const exportOneAsJson = effect(({ payload }) => {
  const { origin: transaction, form } = payload;
  console.log(transaction);
  // const method = form.getValues().method.value;
  // return getFormattedJSON(methods[method].exportTransformer({ call, form }));
  return 'dada'
});
