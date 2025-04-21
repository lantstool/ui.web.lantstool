import { action } from '@react-vault';
import { set } from 'lodash';

export const setAccountCleanerFormValues = action(({ slice, payload }) => {
  const { spaceId, networkId, formValues } = payload;
  set(slice, ['accountCleaner', spaceId, networkId, 'formValues'], formValues);
});
