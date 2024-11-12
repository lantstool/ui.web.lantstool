export async function getAccountBalance({
  accountId,
  finality,
  blockId,
  responseNameConvention = 'camelCase',
}) {
  const [config, account] = await Promise.all([
    this.getProtocolConfig({ finality, blockId, responseNameConvention: 'camelCase' }),
    this.getAccount({ accountId, finality, blockId, responseNameConvention }),
  ]);

  const costPerByte = BigInt(config.runtimeConfig.storageAmountPerByte);
  const stateStaked = BigInt(account.storageUsage) * costPerByte;
  const staked = BigInt(account.locked);
  const totalBalance = BigInt(account.amount) + staked;
  const availableBalance = totalBalance - (staked > stateStaked ? staked : stateStaked);

  if (responseNameConvention === 'camelCase') return  {
    total: totalBalance.toString(),
    stateStaked: stateStaked.toString(),
    staked: staked.toString(),
    available: availableBalance.toString(),
  };

  // At this moment this option exists only for convention
  if (responseNameConvention === 'snake_case') return  {
    total: totalBalance.toString(),
    state_staked: stateStaked.toString(),
    staked: staked.toString(),
    available: availableBalance.toString(),
  };
}
