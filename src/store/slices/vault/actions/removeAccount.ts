import { action } from '../../../../react-vault';

export const removeAccount = action(({ slice, payload }: any) => {
  slice.list = slice.list.filter((accId: string) => accId !== payload);
  delete slice.map[payload];
});
