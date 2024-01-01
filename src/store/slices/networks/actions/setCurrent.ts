import { action } from '../../../../react-vault';

export const setCurrent = action(({ slice, payload }: any) => {
  const { networkId } = payload;
  slice.current = slice.map[networkId];
});
