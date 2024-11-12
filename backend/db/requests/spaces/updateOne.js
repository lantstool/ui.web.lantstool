export const updateOne = async ({ execute, request }) => {
  const updatedValue = request.body?.badge || request.body?.name;
  const updatedRowName = request.body?.badge ? 'badge' : 'name';

  const query = `
    UPDATE spaces
    SET ${updatedRowName} = '${updatedValue}'
    WHERE spaceId = '${request.body.spaceId}'
  `;
  await execute(query)
};
