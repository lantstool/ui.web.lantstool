import { action } from '@react-vault';
import { set } from 'lodash';

export const setFormValues = action(({ slice, payload }) => {
  const { spaceId, networkId, formValues } = payload;
  set(slice, [spaceId, networkId, 'formValues'], formValues);
});
