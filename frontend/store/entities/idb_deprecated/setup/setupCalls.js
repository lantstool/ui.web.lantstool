export const setupCalls = async (db) => {
  const calls = db.createObjectStore('calls', { keyPath: 'callId' });
  calls.createIndex('spaceId_networkId_order', ['spaceId', 'networkId', 'order']);

  const callsCounter = db.createObjectStore('calls-counter', {
    keyPath: ['spaceId', 'networkId'],
  });

  await Promise.all([
    callsCounter.add({ spaceId: 'space1', networkId: 'testnet', count: 0 }),
    callsCounter.add({ spaceId: 'space1', networkId: 'mainnet', count: 0 }),
    callsCounter.add({ spaceId: 'space2', networkId: 'testnet', count: 0 }),
    callsCounter.add({ spaceId: 'space2', networkId: 'mainnet', count: 0 }),
  ]);
};
