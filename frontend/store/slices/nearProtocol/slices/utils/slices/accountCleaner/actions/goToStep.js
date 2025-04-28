import { action } from '@react-vault';
import { set } from 'lodash';

export const goToStep = action(({ slice, payload }) => {
  const { spaceId, networkId, step } = payload;
  set(slice, [spaceId, networkId, 'step'], step);
});
