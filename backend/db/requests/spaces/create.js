import { v4 as uuid } from 'uuid';

const getOwnerId = async (execute) => {
  const query = `
    SELECT userId FROM users WHERE role = 'owner';
  `;
  const [{ userId }] = await execute(query);
  return userId;
};

export const create = async ({ execute, request }) => {
  const spaceId = uuid();
  const name = request.body.spaceName;
  const badge = request.body.badge;
  const type = 'local'; // In the future will be possible to select more space types
  const createdAt = Date.now();
  const ownerId = await getOwnerId(execute);

  const query = `
    INSERT INTO spaces (spaceId, name, badge, type, createdAt, ownerId)
    VALUES('${spaceId}', '${name}', '${badge}', '${type}', ${createdAt}, '${ownerId}')
    RETURNING *;
  `;

  const [space] = await execute(query);
  return space;
};
