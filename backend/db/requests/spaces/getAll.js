export const getAll = async ({ execute }) => {
  const query = `SELECT * FROM spaces`;
  return await execute(query);
};
