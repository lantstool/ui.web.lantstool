export const getOne = async ({ execute, request }) => {
  const query = `
    SELECT * FROM spaces
    WHERE spaceId = '${request.body.spaceId}' 
    `;

  const [space] = await execute(query);
  return space
};
