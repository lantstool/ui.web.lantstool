import { effect } from '@react-vault';
import { getFormattedJSON } from '../../../../../helpers/utils.js';
import { methods } from '../helpers/methods/index.js';

export const exportOneAsJson = effect(({ payload }) => {
  const { origin: call, form, setData } = payload;
  const method = form.getValues().method.value;

  const json = methods[method].exportTransformer({ call, form });
  const formatedJson = getFormattedJSON(json);

  setData(formatedJson);
});
