export const setupUsers = async (db: any, ids: any) => {
  const users = db.createObjectStore('users', { keyPath: 'userId' });

  await users.add({
    userId: ids.userId,
    name: 'John Doe',
    createdAt: Date.now(),
  });
};