import { effect } from "../../../react-vault";
import { v4 } from 'uuid';

export const onAddTransaction = effect(async ({ payload, slice, store }: any) => {
  const [idb] = store.getEntities((store: any) => store.idb);
  const addTransaction = slice.getActions((slice: any) => slice.addTransaction);

  try {
    const transactionId = v4();

    const transaction = {
      transactionId,
      name: `${transactionId}`,
      createdAt: new Date().toISOString(),
      signerId: '',
      publicKey: '',
      receiverId: '',
      actions: [],
    };

    await idb.add('transactions', transaction);
    addTransaction(transaction);
  } catch (e) {
    console.log(e);
  }
});
