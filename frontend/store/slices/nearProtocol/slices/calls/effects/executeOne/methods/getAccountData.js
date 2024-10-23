export const getAccountData = (rpc, { accountId, finality, blockId }) =>
  rpc.account.viewAccount({ accountId, finality, blockId });
