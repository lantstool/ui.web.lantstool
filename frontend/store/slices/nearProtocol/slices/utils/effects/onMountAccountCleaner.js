import { effect } from '@react-vault';

export const onMountAccountCleaner = effect(({ slice, payload }) => {
  const { spaceId, networkId } = payload;
  const accountCleaner = slice.getState((slice) => slice.accountCleaner?.[spaceId]?.[networkId]);
  const mountAccountCleaner = slice.getActions((slice) => slice.mountAccountCleaner);

  if (!accountCleaner) mountAccountCleaner(payload);
});
