import { action } from '../../../react-vault';

export const addKey = action(({ slice, payload }: any) => {
  const { keyData, accountId } = payload;

  slice.map[accountId].list.push(keyData.publicKey);
  slice.map[accountId].map[keyData.publicKey] = keyData;
});
