import { protocol } from '../protocol/index.js';
import { viewAccount } from './viewAccount.js';

export const getBalance = (provider) => async (accountId) => {
  const [config, account] = await Promise.all([
    protocol.getConfig(provider)(),
    viewAccount(provider)(accountId),
  ]);

  const costPerByte = BigInt(config.runtimeConfig.storageAmountPerByte);
  const stateStaked = BigInt(account.storageUsage) * costPerByte;
  const staked = BigInt(account.locked);
  const totalBalance = BigInt(account.amount) + staked;
  const availableBalance = totalBalance - (staked > stateStaked ? staked : stateStaked);

  return {
    total: totalBalance.toString(),
    stateStaked: stateStaked.toString(),
    staked: staked.toString(),
    available: availableBalance.toString(),
  };
};
