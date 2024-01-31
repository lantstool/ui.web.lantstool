export const setupKeys = (db: any) => {
  const keys = db.createObjectStore('keys', { keyPath: ['spaceId', 'publicKey'] });
  keys.createIndex('space', ['spaceId', 'order']);
};