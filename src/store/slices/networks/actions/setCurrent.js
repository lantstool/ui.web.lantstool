import { action } from '../../../../react-vault';

export const setCurrent = action(({ slice, payload }) => {
  const { networkId } = payload;
  slice.current = slice.map[networkId];
});
