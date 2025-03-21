export const getOwnerId = async ({ execute }) => {
  const query = `
    SELECT userId FROM users WHERE role = 'owner';
  `;
  const [{ userId }] = await execute(query);
  return userId;
};
