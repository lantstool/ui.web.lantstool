import { effect } from '@react-vault';

export const onMount = effect(({ slice, payload }) => {
  const { spaceId, networkId } = payload;
  const values = slice.getState((slice) => slice?.[spaceId]?.[networkId]);
  const mount = slice.getActions((slice) => slice.mount);

  if (!values) mount(payload);
});
