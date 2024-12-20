import { effect } from '@react-vault';
import { getFormattedJSON } from '../../../../../helpers/utils.js';
import { methods } from '../helpers/methods/index.js';

export const exportOneAsJson = effect(({ payload }) => {
  const { call, form } = payload;
  const method = form.getValues().method.value;
  return getFormattedJSON(methods[method].exportTransformer({ call, form }));
});
