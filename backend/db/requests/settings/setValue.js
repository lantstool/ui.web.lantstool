export const setValue = async ({ execute, request }) => {
  const { key, value } = request.body;

  const query = `
    UPDATE settings SET value = '${JSON.stringify(value)}'
    WHERE key = '${key}'
  `;
  await execute(query);
};
