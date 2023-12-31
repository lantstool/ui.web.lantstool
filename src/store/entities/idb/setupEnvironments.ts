export const setupEnvironments = (db: any) => {
  const environments = db.createObjectStore('environments', { keyPath: 'environmentId' });
  environments.createIndex('networkId', 'networkId');
};