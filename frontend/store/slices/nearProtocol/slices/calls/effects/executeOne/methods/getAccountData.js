export const getAccountData = (rpc, params) =>
  rpc.account.viewAccount(params.accountId);

