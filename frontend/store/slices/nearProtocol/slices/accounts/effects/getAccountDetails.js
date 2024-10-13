import { effect } from '../../../../../../../react-vault/index.js';

export const getAccountDetails = effect(async ({ store, slice, payload }) => {
  const { spaceId, networkId, accountId } = payload;
  const setAccountDetails = slice.getActions((slice) => slice.setAccountDetails);
  const createRpc = store.getEffects((store) => store.nearProtocol.createRpc);

  try {
    const rpc = await createRpc({ spaceId, networkId });

    const [details, balance] = await Promise.all([
      rpc.account.viewAccount(accountId),
      rpc.account.getBalance(accountId),
    ]);

    setAccountDetails({ accountId, details, balance });
  } catch (e) {
    console.log(e);
  }
});
