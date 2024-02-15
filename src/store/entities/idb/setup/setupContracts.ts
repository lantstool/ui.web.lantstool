export const setupContracts = (db: any) => {
  const contracts = db.createObjectStore('contracts', { keyPath: 'contractId' });
  contracts.createIndex('spaceId_createdAt', ['spaceId', 'createdAt']);
};
