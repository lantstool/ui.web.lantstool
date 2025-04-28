import { effect } from '@react-vault';
import get from 'lodash/get';

export const onMountKeyGenerator = effect(({ slice, payload }) => {
  const { spaceId, networkId } = payload;
  const keyGenerator = slice.getState((slice) => slice.keyGenerator);
  const generateKey = slice.getEffects((slice) => slice.generateKey);

  if (!get(keyGenerator, [spaceId, networkId, 'seedPhrase'])) generateKey(payload);
});
