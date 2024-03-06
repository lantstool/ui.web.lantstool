import { action } from '../../../../react-vault';

export const removeAccount = action(({ slice, payload }: any) => {
  slice.ids = slice.ids.filter((accountId: string) => accountId !== payload);
  delete slice.records[payload];
});
