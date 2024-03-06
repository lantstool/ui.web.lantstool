export const setupTransactions = async (db: any) => {
  const transactions = db.createObjectStore('transactions', { keyPath: 'transactionId' });
  transactions.createIndex('spaceId_networkId_order', ['spaceId', 'networkId', 'order']);

  const transactionsCounter = db.createObjectStore('transactions-counter', {
    keyPath: ['spaceId', 'networkId'],
  });

  await Promise.all([
    transactionsCounter.add({ spaceId: 'space1', networkId: 'testnet', count: 0 }),
    transactionsCounter.add({ spaceId: 'space1', networkId: 'mainnet', count: 0 }),
    transactionsCounter.add({ spaceId: 'space2', networkId: 'testnet', count: 0 }),
    transactionsCounter.add({ spaceId: 'space2', networkId: 'mainnet', count: 0 }),
  ]);
};
