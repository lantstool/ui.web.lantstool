import { effect } from '@react-vault';

export const getAccountBalance = effect(async ({ store, payload }) => {
  const { spaceId, networkId, accountId } = payload;
  const createRpc = store.getEffects((store) => store.nearProtocol.createRpc);

  try {
    const rpc = await createRpc({ spaceId, networkId });
    return await rpc.account.getBalance(accountId);
  } catch (e) {
    console.log(e);
  }
});
