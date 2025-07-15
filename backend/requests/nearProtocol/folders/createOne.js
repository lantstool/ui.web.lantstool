import { v4 as uuid } from 'uuid';
import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';

export const createOne = async ({ execute, request }) => {
  const { spaceId, networkId, type } = request.body;
  const folderId = uuid();
  const name = `New folder`;
  const collapsed = 0; // 0 because we transform to boolean type, it's equal to false

  const query = `
    INSERT INTO near_protocol_folders
      VALUES(
        @folderId,
        @networkId,
        @spaceId, 
        @name, 
        @type,
        @collapsed
      )
    RETURNING *;
  `;

  const [folder] = await execute(
    query,
    addPrefixToObjKeys({
      folderId,
      networkId,
      spaceId,
      name,
      type,
      collapsed,
    }),
  );

  return folder;
};
