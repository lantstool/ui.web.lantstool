import { effect } from '@react-vault';

export const resetApp = effect(async ({ store, payload }) => {
  const { navigate } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const [history] = store.getEntities((store) => store.history);
  const actions = store.getActions((store) => store);

  try {
    await backend.sendRequest('resetDatabase');
    history.reset();

    actions.resetState();
    actions.spaces.resetState();
    actions.nearProtocol.resetState();
    actions.nearProtocol.networks.resetState();
    actions.nearProtocol.transactions.resetState();
    actions.nearProtocol.calls.resetState();
    actions.nearProtocol.accounts.resetState();
    actions.nearProtocol.keys.resetState();

    navigate('/spaces');
  } catch (e) {
    console.log(e);
  }
});
