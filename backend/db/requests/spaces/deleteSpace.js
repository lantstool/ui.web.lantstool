export const deleteSpace = async ({ execute, request }) => {
  const query = `
    DELETE FROM spaces
    WHERE spaceId = '${request.body.spaceId}';
  `;
  await execute(query);
};
