import { action } from '@react-vault';
import { set } from 'lodash';

export const setUnitConverterValues = action(({ slice, payload }) => {
  const { spaceId, networkId, formValues } = payload;
  set(slice, ['unitConverter', spaceId, networkId], formValues);
});
