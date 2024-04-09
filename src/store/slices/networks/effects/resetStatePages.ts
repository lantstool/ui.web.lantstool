import { effect } from '../../../../react-vault';

export const resetStatePages = effect(async ({ store }: any) => {
  const resetStateCalls = store.getActions((store: any) => store.calls.resetState);
  const resetStateTransactions = store.getActions((store: any) => store.transactions.resetState);
  const resetStateKeys = store.getActions((store: any) => store.keys.resetState);
  const resetStateAccounts = store.getActions((store: any) => store.accounts.resetState);

  try {
    resetStateCalls();
    resetStateTransactions();
    resetStateKeys();
    resetStateAccounts();
  } catch (e) {
    console.log(e);
  }
});
