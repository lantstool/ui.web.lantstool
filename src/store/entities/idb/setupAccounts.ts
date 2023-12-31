export const setupAccounts = (db: any) => {
  const accounts = db.createObjectStore('accounts', { keyPath: 'accountId' });
  accounts.createIndex('networkId', 'networkId');
};