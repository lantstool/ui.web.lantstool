export const setupTransactions = async (db: any, ids: any) => {
  const transactions = db.createObjectStore('transactions', { keyPath: 'transactionId' });
  transactions.createIndex('networkIdOrder', ['networkId', 'order'], { unique: true });

  const transactionsCounter = db.createObjectStore('transactions-counter', {
    keyPath: 'networkId',
  });

  await transactionsCounter.add({ networkId: ids.testnetId, count: 0 });
  await transactionsCounter.add({ networkId: ids.mainnetId, count: 0 });
};