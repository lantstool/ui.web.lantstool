import { action } from '@react-vault';
import { set } from 'lodash';

export const setGeneratedKey = action(({ slice, payload }) => {
  const { spaceId, networkId, values } = payload;
  set(slice, ['keyGenerator', spaceId, networkId], values);
});
