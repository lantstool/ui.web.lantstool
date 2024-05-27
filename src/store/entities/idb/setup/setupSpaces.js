export const setupSpaces = async (db) => {
  const spaces = db.createObjectStore('spaces', { keyPath: 'spaceId' });
  spaces.createIndex('createdAt', 'createdAt');

  await spaces.add({
    spaceId: 'space1',
    name: 'Personal',
    createdAt: Date.now(),
  });

  await spaces.add({
    spaceId: 'space2',
    name: 'General',
    createdAt: Date.now() + 1,
  });
};
