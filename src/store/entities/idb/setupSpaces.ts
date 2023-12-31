export const setupSpaces = async (db: any, ids: any) => {
  const spaces = db.createObjectStore('spaces', { keyPath: 'spaceId' });
  spaces.createIndex('members', 'members.list', { multiEntry: true });

  await spaces.add({
    spaceId: ids.spaceId,
    name: 'Personal',
    createdAt: Date.now(),
    members: {
      list: [ids.userId],
      map: {
        [ids.userId]: {
          userId: ids.userId,
          role: 'owner',
        },
      },
    },
  });
};