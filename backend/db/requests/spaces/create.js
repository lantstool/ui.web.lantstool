export const create = async ({ execute }) => {
  const query = `
    INSERT INTO spaces (spaceId, name, type, createdAt, ownerId)
    VALUES('s4', 'Personal', 'local', 12345, 'a1');
  `;

  await execute(query);
};
