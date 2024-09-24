import { effect } from '../../../../../../../react-vault/index.js';

export const changeNetwork = effect(async ({ store, payload }) => {
  const { navigate, networkId } = payload;
  const resetStateCalls = store.getActions((store) => store.calls.resetState);
  const resetStateTransactions = store.getActions((store) => store.transactions.resetState);
  const resetStateKeys = store.getActions((store) => store.keys.resetState);
  const resetStateAccounts = store.getActions((store) => store.accounts.resetState);

  resetStateCalls();
  resetStateTransactions();
  resetStateKeys();
  resetStateAccounts();
  navigate(`/${networkId}`);
});
