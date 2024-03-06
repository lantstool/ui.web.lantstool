export const setupAccounts = (db: any) => {
  const accounts = db.createObjectStore('accounts', {
    keyPath: ['spaceId', 'networkId', 'accountId'],
  });
  accounts.createIndex('spaceId_networkId_importedAt', ['spaceId', 'networkId', 'importedAt']);
};
