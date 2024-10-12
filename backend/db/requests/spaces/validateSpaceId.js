export const validateSpaceId = async ({ execute, request }) => {
  const { spaceId } = request.body;
  const query = `
    SELECT spaceId FROM spaces
    WHERE spaceId = '${spaceId}'
  `;

  const [space] = await execute(query);

  if (!space) {
    const error = new Error();
    error.message = `Space '${spaceId}' not found. Please verify the space ID and try again.`;
    error.code = 404;
    throw error;
  }
};

