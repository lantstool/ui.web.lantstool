import { action } from '../../../../react-vault';

export const setAccountChainDetails = action(({ slice, payload }: any) => {
  const { accountId, details } = payload;

  slice.records[accountId].balance = details.amount;
  slice.records[accountId].storageUsage = details.storageUsage;
  slice.records[accountId].hasDeployedOnChainContract =
    details.codeHash !== '11111111111111111111111111111111';
});
