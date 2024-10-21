import { utils } from 'near-api-js';
import { action } from '@react-vault';

const formatNumber = (number) => {
  const formatNearAmount = utils.format.formatNearAmount(number);
  return formatNearAmount.toString().replace(/(\.\d{5})\d*$/, '$1');
};

export const setAccountDetails = action(({ slice, payload }) => {
  const { details, balance } = payload;

  slice.account.details = {};

  slice.account.details.storageUsage = details.storageUsage;
  slice.account.details.hasDeployedContract =
    details.codeHash !== '11111111111111111111111111111111';

  slice.account.details.balance = formatNumber(details.amount);
  slice.account.details.lockedForStorage = formatNumber(balance.stateStaked);
  slice.account.details.available = formatNumber(balance.available);
});
