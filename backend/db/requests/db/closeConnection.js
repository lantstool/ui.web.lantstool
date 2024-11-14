export const closeConnection = async ({ db }) => {
  await db.sqlite.close(db.connection);
};
