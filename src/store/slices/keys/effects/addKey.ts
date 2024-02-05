import { effect } from '../../../../react-vault';

const key1 = {
  spaceId: 'space1',
  publicKey: 'ed25519:EU3JT4N2ahWEzVPfcjEutG89ZDfX1vcqeYz9N1DDest6',
  privateKey:
    'ed25519:4bHM2QyM1yAgZoVazdLudgJGPmeKQFJNEND3ygt6ajPe6UUZYUmsWUxEuiRgLqygcUsUEPqeAyreGoWX5XCAP8DG',
  seedPhrase: 'chronic adjust pig pistol candy laugh rigid beauty movie high cruel conduct',
  importedAt: Date.now(),
  order: 0,
  wallet: 'lantstool',
  networkId: null,
};

const key2 = {
  spaceId: 'space1',
  publicKey: 'ed25519:6a2jKyeLxy5nS8tTR6pLHdD1hc9eaEQdqyXFx1QboYVR',
  privateKey:
    'ed25519:517tJNe48kyK5VyQJxHZgaaTRVZXmG4ag4W6E5fKfwGSrTW8oi2jL8LDves7UmLdZDYtc8tDcWm5aH2D5vaiXoe3',
  seedPhrase: 'aerobic use identify carbon edge holiday gas side belt beyond wagon such',
  importedAt: Date.now(),
  order: 1,
  wallet: 'myNearWallet',
  networkId: 'testnet',
};

const key3 = {
  spaceId: 'space1',
  publicKey: 'ed25519:73MDBFZMbJBNY4nnwZSdUy6TiQshsfR4zA6mLMJed8ot',
  privateKey:
    'ed25519:56v4MRJfmf8tNHjYK14EFPkUQw8vfV9MpgoU13saEpSLpN5fZEHBZ1w2GzopSenTkTbk111A6hffcS5rG9jQmd3Q',
  seedPhrase: 'upon tube useless grass damp defy broom energy grunt spare turn crawl',
  importedAt: Date.now(),
  order: 2,
  wallet: 'myNearWallet',
  networkId: 'mainnet',
};

const key4 = {
  spaceId: 'space-2',
  publicKey: 'ed25519:EU3JT4N2ahWEzVPfcjEutG89ZDfX1vcqeYz9N1DDest6',
  privateKey:
    'ed25519:4bHM2QyM1yAgZoVazdLudgJGPmeKQFJNEND3ygt6ajPe6UUZYUmsWUxEuiRgLqygcUsUEPqeAyreGoWX5XCAP8DG',
  seedPhrase: 'chronic adjust pig pistol candy laugh rigid beauty movie high cruel conduct',
  importedAt: Date.now(),
  order: 0,
  wallet: 'lantstool',
  networkId: null,
};

export const addKey = effect(async ({ store }: any) => {
  const [idb] = store.getEntities((store: any) => store.idb);

  try {
    await idb.put('keys', key1);
    await idb.put('keys', key2);
    await idb.put('keys', key3);
    await idb.put('keys', key4);
  } catch (e) {
    console.log(e);
  }
});