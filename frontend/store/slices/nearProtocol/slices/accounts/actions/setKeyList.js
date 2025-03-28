import { action } from '@react-vault';

export const setKeyList = action(({ slice, payload }) => {
  const { accountId, accountKeys, keyList } = payload;

  slice.records[accountId].keys = accountKeys.map((key) => ({
    ...key,
    isLocalExists: keyList.includes(key.publicKey),
  }));
});
