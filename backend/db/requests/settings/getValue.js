export const getValue = async ({ execute, request }) => {
  const { key } = request.body;
  const query = `SELECT value FROM settings WHERE key = '${key}'`;
  const [{ value }] = await execute(query);
  return JSON.parse(value);
};
