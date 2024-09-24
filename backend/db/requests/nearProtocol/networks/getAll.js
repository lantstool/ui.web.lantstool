export const getAll = async ({ execute }) => {
  const query = `SELECT * FROM near_protocol_networks`;
  return await execute(query);
};
