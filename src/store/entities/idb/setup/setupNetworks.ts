export const setupNetworks = async (db: any) => {
  const networks = db.createObjectStore('networks', { keyPath: ['spaceId', 'networkId'] });
  networks.createIndex('spaceId_createdAt', ['spaceId', 'createdAt']);

  await networks.add({
    spaceId: 'space1',
    networkId: 'testnet',
    createdAt: Date.now(),
    url: {
      rpc: 'https://rpc.testnet.near.org',
      myNearWallet: 'https://testnet.mynearwallet.com',
    },
  });

  await networks.add({
    spaceId: 'space1',
    networkId: 'mainnet',
    createdAt: Date.now() + 1,
    url: {
      rpc: 'https://rpc.mainnet.near.org',
      myNearWallet: 'https://app.mynearwallet.com',
    },
  });

  await networks.add({
    spaceId: 'space2',
    networkId: 'testnet',
    createdAt: Date.now() + 2,
    url: {
      rpc: 'https://rpc.testnet.near.org',
      myNearWallet: 'https://testnet.mynearwallet.com',
    },
  });

  await networks.add({
    spaceId: 'space2',
    networkId: 'mainnet',
    createdAt: Date.now() + 3,
    url: {
      rpc: 'https://rpc.mainnet.near.org',
      myNearWallet: 'https://app.mynearwallet.com',
    },
  });
};
