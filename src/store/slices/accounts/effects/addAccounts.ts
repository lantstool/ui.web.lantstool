import { effect } from '../../../../react-vault';

const account1 = {
  spaceId: 'space1',
  networkId: 'testnet',
  accountId: 'eclipseer.testnet',
  importedAt: Date.now(),
  contract: null,
};

const account2 = {
  spaceId: 'space1',
  networkId: 'testnet',
  accountId: 'eclpseeer-multisig-test-1.testnet',
  importedAt: Date.now() + 1,
  contract: null,
};

export const addAccounts = effect(async ({ store }: any) => {
  const [idb] = store.getEntities((store: any) => store.idb);

  try {
    await idb.put('accounts', account1);
    await idb.put('accounts', account2);
  } catch (e) {
    console.log(e);
  }
});