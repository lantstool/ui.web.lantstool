import { effect } from '../../../../react-vault';

const account1 = {
  spaceId: 'space1',
  networkId: 'testnet',
  accountId: 'eclipseer.testnet',
  importedAt: Date.now(),
  order: 0,
  contract: null,
};

export const addAccounts = effect(async ({ store }: any) => {
  const [idb] = store.getEntities((store: any) => store.idb);

  try {
    await idb.put('keys', account1);
  } catch (e) {
    console.log(e);
  }
});