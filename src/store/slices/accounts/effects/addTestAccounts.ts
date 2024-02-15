import { effect } from '../../../../react-vault';

const account1 = {
  spaceId: 'space1',
  networkId: 'testnet',
  accountId: 'eclipseer.testnet',
  importedAt: Date.now(),
  contract: {
    name: '',
    methods: {
      change: [],
      view: [],
    },
  },
};

const account2 = {
  spaceId: 'space1',
  networkId: 'testnet',
  accountId: 'eclpseeer-multisig-test-1.testnet',
  importedAt: Date.now() + 1,
  contract: {
    name: 'Multisig v1',
    methods: {
      change: [{ name: 'add_request' }],
      view: [
        { name: 'list_request_ids' },
        { name: 'get_request' },
        { name: 'get_num_confirmations' },
        { name: 'get_request_nonce' },
        { name: 'get_confirmations' },
      ],
    },
  },
};

export const addTestAccounts = effect(async ({ store }: any) => {
  const [idb] = store.getEntities((store: any) => store.idb);

  try {
    await idb.put('accounts', account1);
    await idb.put('accounts', account2);
  } catch (e) {
    console.log(e);
  }
});
