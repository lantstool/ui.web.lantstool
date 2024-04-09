import { effect } from '../../../../react-vault';

export const changeNetwork = effect(async ({ store, payload }: any) => {
  const { navigate, networkId } = payload;
  const resetStateCalls = store.getActions((store: any) => store.calls.resetState);
  const resetStateTransactions = store.getActions((store: any) => store.transactions.resetState);
  const resetStateKeys = store.getActions((store: any) => store.keys.resetState);
  const resetStateAccounts = store.getActions((store: any) => store.accounts.resetState);

  resetStateCalls();
  resetStateTransactions();
  resetStateKeys();
  resetStateAccounts();
  navigate(`/${networkId}`);
});
