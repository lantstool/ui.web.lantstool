import { effect } from '@react-vault';

export const getAccountDetails = effect(async ({ store, slice, payload }) => {
  const { spaceId, networkId, accountId } = payload;
  const setAccountDetails = slice.getActions((slice) => slice.setAccountDetails);
  const createRpc = store.getEffects((store) => store.nearProtocol.createRpc);
  const [backend] = store.getEntities((store) => store.backend);

  try {
    const rpc = await createRpc({ spaceId, networkId });
    const account = await backend.sendRequest('nearProtocol.accounts.getOne', accountId);
    const [details, balance] = await Promise.all([
      rpc.account.viewAccount({ accountId }),
      rpc.account.getBalance({ accountId }),
    ]);

    setAccountDetails({ details, balance, account });
  } catch (e) {
    console.log(e);
  }
});
