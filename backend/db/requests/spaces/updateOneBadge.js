export const updateOneBadge = async ({ execute, request }) => {
  const query = `
    UPDATE spaces
    SET badge = '${request.body.badge}'
    WHERE spaceId = '${request.body.spaceId}'
  `;
  await execute(query);
};
