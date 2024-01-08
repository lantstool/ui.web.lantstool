import { effect } from '../../../../react-vault';
import { v4 } from 'uuid';

const createTx = (order: number, transactionName: string, networkId: string) => {
  const transactionId = v4();

  return {
    userId: '1u',
    spaceId: '1s',
    networkId,
    transactionId,
    name: transactionName,
    createdAt: new Date(),
    order,
    signerId: '',
    signerKey: '',

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
  const { navigate, transactionName } = payload;
  const networkId = store.getState((store: any) => store.networks.current.networkId);
  const [idb] = store.getEntities((store: any) => store.idb);
  const addTransaction = slice.getActions((slice: any) => slice.addTransaction);

  try {
    const [txOrder, txCounter] = await Promise.all([
      idb.countFromIndex(
        'transactions',
        'networkIdOrder',
        IDBKeyRange.bound([networkId, 0], [networkId, Infinity]),
      ),
      idb.get('transactions-counter', networkId),
    ]);
    txCounter.count += 1;

    const transaction = createTx(txOrder, transactionName, networkId);

    await Promise.all([
      idb.add('transactions', transaction),
      idb.put('transactions-counter', txCounter),
    ]);

    addTransaction(transaction);
    navigate(`/transactions/${transaction.transactionId}`);
  } catch (e) {
    console.log(e);
  }
});
