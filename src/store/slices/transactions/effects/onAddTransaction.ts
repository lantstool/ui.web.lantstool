import { effect } from '../../../../react-vault';
import { v4 } from 'uuid';

const networkId = 'a';

const createTx = (order: number) => {
  const transactionId = v4();

  return {
    userId: '1u',
    spaceId: '1s',
    networkId,
    transactionId,
    name: `TX#${transactionId.slice(0, 10)}`,
    createdAt: new Date().toISOString(),
    order,
    signer: {
      accountId: '',
      source: 'Input',
    },
    signerKey: {
      source: 'Manually',
      publicKey: '',
      privateKey: '',
      seedPhrase: '',
    },
    receiver: {
      type: 'existing',
      existing: {
        accountId: '',
      },
      newNamed: {
        accountId: '',
      },
      newImplicit: {
        accountId: '',
        seedPhrase: '',
        privateKey: '',
        publicKey: '',
      },
    },
    actions: [],
  };
};

export const onAddTransaction = effect(async ({ payload, slice, store }: any) => {
  const { navigate } = payload;
  const [idb] = store.getEntities((store: any) => store.idb);
  const addTransaction = slice.getActions((slice: any) => slice.addTransaction);

  try {
    const txOrder = await idb.countFromIndex(
      'transactions',
      'networkIdOrder',
      IDBKeyRange.bound([networkId, 0], [networkId, Infinity]),
    );

    const transaction = createTx(txOrder);
    await idb.add('transactions', transaction);

    addTransaction(transaction);
    navigate(`/transactions/${transaction.transactionId}`);
  } catch (e) {
    console.log(e);
  }
});
