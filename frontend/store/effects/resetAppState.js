import { effect } from '@react-vault';

export const resetAppState = effect(async ({ store }) => {
  const actions = store.getActions((store) => store);

  actions.resetState();
  actions.spaces.resetState();
  actions.nearProtocol.resetState();
  actions.nearProtocol.networks.resetState();
  actions.nearProtocol.transactions.resetState();
  actions.nearProtocol.calls.resetState();
  actions.nearProtocol.accounts.resetState();
  actions.nearProtocol.keys.resetState();
});
