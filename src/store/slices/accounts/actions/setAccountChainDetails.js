import { action } from '../../../../react-vault/index.js';

export const setAccountChainDetails = action(({ slice, payload }) => {
  const { accountId, details, balance } = payload;

  slice.records[accountId].balance = details.amount;
  slice.records[accountId].storageUsage = details.storageUsage;
  slice.records[accountId].hasDeployedOnChainContract =
    details.codeHash !== '11111111111111111111111111111111';

  slice.records[accountId].lockedForStorage = balance.stateStaked;
  slice.records[accountId].available = balance.available;
});
