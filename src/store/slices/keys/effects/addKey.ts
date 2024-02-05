import { effect } from '../../../../react-vault';

const key1 = {
  spaceId: 'space1',
  networkId: 'testnet',
  wallet: 'lantstool',
  publicKey: 'ed25519:EU3JT4N2ahWEzVPfcjEutG89ZDfX1vcqeYz9N1DDest6',
  privateKey:
    'ed25519:4bHM2QyM1yAgZoVazdLudgJGPmeKQFJNEND3ygt6ajPe6UUZYUmsWUxEuiRgLqygcUsUEPqeAyreGoWX5XCAP8DG',
  seedPhrase: 'chronic adjust pig pistol candy laugh rigid beauty movie high cruel conduct',
  importedAt: Date.now(),
};

const key2 = {
  spaceId: 'space1',
  networkId: 'testnet',
  wallet: 'lantstool',
  publicKey: 'ed25519:F2RJPxru3LrZyfDr8YVidkofo5Mk33eU5NRV9PF6FcWe',
  privateKey:
    'ed25519:vSycBnBa5XHZLAPHTRBSTAXaSsBYALrG6o2LvgfWLCZFLQ1iKBRpVBgWRCXdA48m9veMSVFQvho5RdxeXVGQdrr',
  seedPhrase: 'float lock segment adult deliver dinner client reunion turtle wheel small spell',
  importedAt: Date.now() + 1,
};

const key3 = {
  spaceId: 'space1',
  networkId: 'testnet',
  wallet: 'myNearWallet',
  publicKey: 'ed25519:6a2jKyeLxy5nS8tTR6pLHdD1hc9eaEQdqyXFx1QboYVR',
  privateKey: null,
  seedPhrase: null,
  importedAt: Date.now() + 2,
};

const key4 = {
  spaceId: 'space1',
  networkId: 'mainnet',
  wallet: 'myNearWallet',
  publicKey: 'ed25519:73MDBFZMbJBNY4nnwZSdUy6TiQshsfR4zA6mLMJed8ot',
  privateKey: null,
  seedPhrase: null,
  importedAt: Date.now() + 3,
};

const key5 = {
  spaceId: 'space2',
  networkId: 'testnet',
  wallet: 'lantstool',
  publicKey: 'ed25519:EU3JT4N2ahWEzVPfcjEutG89ZDfX1vcqeYz9N1DDest6',
  privateKey:
    'ed25519:4bHM2QyM1yAgZoVazdLudgJGPmeKQFJNEND3ygt6ajPe6UUZYUmsWUxEuiRgLqygcUsUEPqeAyreGoWX5XCAP8DG',
  seedPhrase: 'chronic adjust pig pistol candy laugh rigid beauty movie high cruel conduct',
  importedAt: Date.now() + 4,
};

export const addKey = effect(async ({ store }: any) => {
  const [idb] = store.getEntities((store: any) => store.idb);

  try {
    await idb.put('keys', key1);
    await idb.put('keys', key2);
    await idb.put('keys', key3);
    await idb.put('keys', key4);
    await idb.put('keys', key5);
  } catch (e) {
    console.log(e);
  }
});