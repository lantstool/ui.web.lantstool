import { action } from '../../../react-vault';

export const addKey = action(({ slice, payload }: any) => {
  const { data, accountId } = payload;
  const { publicKey, seedPhrase, privateKey } = data;
  console.log(data)
  slice.map[accountId].list.push(publicKey);
  slice.map[accountId].map[publicKey] = { accountId, publicKey, seedPhrase, privateKey };
});
