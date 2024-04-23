import { action } from '../../../../react-vault';

export const setKeyList = action(({ slice, payload }: any) => {
  const { accountId, accountKeys, keyList } = payload;

  slice.records[accountId].keys = accountKeys.map((key: any) => ({
    ...key,
    isLocalExists: keyList.includes(key.publicKey),
  }));
});
