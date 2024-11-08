import { v4 as uuid } from 'uuid';

export const create = async ({ execute, request }) => {
  const spaceId = uuid();
  const name = request.body.name;
  const badge = request.body.badge;
  const type = 'local'; // In the future will be possible to select more space types
  const createdAt = Date.now();
  const ownerId = 'anonymous'; // For now, we don't require user to has an account

  const query = `
    INSERT INTO spaces (spaceId, name, badge, type, createdAt, ownerId)
    VALUES('${spaceId}', '${name}', '${badge}', '${type}', ${createdAt}, '${ownerId}')
    RETURNING *;
  `;

  const [space] = await execute(query);
  return space;
};
