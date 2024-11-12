import { effect } from '@react-vault';

export const getAccountBalance = effect(async ({ store, payload }) => {
  const { spaceId, networkId, accountId } = payload;
  const [rpc] = store.getEntities((store) => store.nearProtocol.rpcProvider);

  try {
    await rpc.configure({ spaceId, networkId });
    return await rpc.getAccountBalance({ accountId });
  } catch (e) {
    console.log(e);
  }
});
