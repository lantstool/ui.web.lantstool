import { effect } from '@react-vault';

export const getAccountDetails = effect(async ({ store, slice, payload }) => {
  const { spaceId, networkId, accountId } = payload;
  const setAccountDetails = slice.getActions((slice) => slice.setAccountDetails);
  const [rpc] = store.getEntities((store) => store.nearProtocol.rpcProvider);
  const [backend] = store.getEntities((store) => store.backend);

  try {
    await rpc.configure({ spaceId, networkId });

    const account = await backend.sendRequest('nearProtocol.accounts.getOne', {
      spaceId,
      networkId,
      accountId,
    });

    const [details, balance] = await Promise.all([
      rpc.getAccount({ accountId }),
      rpc.getAccountBalance({ accountId }),
    ]);

    setAccountDetails({ details, balance, account });
  } catch (e) {
    console.log(e);
  }
});
