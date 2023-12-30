import { action } from '../../../../react-vault';

export const removeKey = action(({ slice, payload }: any) => {
  const { accountId, publicKey } = payload;
  slice.map[accountId].list = slice.map[accountId].list.filter((key: string) => key !== publicKey);
  delete slice.map[accountId].map[publicKey];
});
