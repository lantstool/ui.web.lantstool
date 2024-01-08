import { action } from '../../../../react-vault';

export const removeNetwork = action(({ slice, payload: networkId }: any) => {
  slice.list = slice.list.filter((id: string) => id !== networkId);
  delete slice.map[networkId];

  slice.current = slice.map[slice.list[0]];
});
