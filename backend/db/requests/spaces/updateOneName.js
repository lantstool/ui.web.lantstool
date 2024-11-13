export const updateOneName = async ({ execute, request }) => {
  const query = `
    UPDATE spaces
    SET name = '${request.body.name}'
    WHERE spaceId = '${request.body.spaceId}'
  `;
  await execute(query);
};
