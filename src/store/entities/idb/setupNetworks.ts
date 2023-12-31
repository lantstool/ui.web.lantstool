export const setupNetworks = async (db: any, ids: any) => {
  const networks = db.createObjectStore('networks', { keyPath: 'networkId' });
  networks.createIndex('spaceId', 'spaceId');

  await networks.add({
    spaceId: ids.spaceId,
    networkId: ids.testnetId,
    name: 'Testnet',
    createdAt: Date.now(),
    url: {
      rpc: 'https://beta.rpc.testnet.near.org',
      myNearWallet: 'https://testnet.mynearwallet.com',
    },
  });

  await networks.add({
    spaceId: ids.spaceId,
    networkId: ids.mainnetId,
    name: 'Mainnet',
    createdAt: Date.now(),
    url: {
      rpc: 'https://beta.rpc.mainnet.near.org',
      myNearWallet: 'https://app.mynearwallet.com',
    },
  });
};
