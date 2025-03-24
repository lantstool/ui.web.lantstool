export const getCount = async ({ execute }) => {
  const query = `
    SELECT COUNT(*) as count
    FROM spaces
  `;

  const [{ count }] = await execute(query);
  return count;
};
