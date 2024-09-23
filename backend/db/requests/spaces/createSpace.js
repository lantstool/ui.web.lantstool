import { v4 as uuid } from 'uuid';

export const createSpace = async ({ execute, request }) => {
  const id = uuid();
  const name = request.body.name;
  const type = 'local';
  const createdAt = Date.now();
  const ownerId = 'anonymous';

  const query = `
    INSERT INTO spaces (spaceId, name, type, createdAt, ownerId)
    VALUES('${id}', '${name}', '${type}', ${createdAt}, '${ownerId}')
    RETURNING *;
  `;

  const [space] = await execute(query);

  return space;
};
