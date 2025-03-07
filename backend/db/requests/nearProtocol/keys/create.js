import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';

export const create = async ({ execute, request }) => {
  const createdAt = Date.now();

  const query = `
    INSERT INTO near_protocol_keys 
      VALUES(
        @publicKey,
        @networkId,
        @spaceId,
        @createdAt,
        @privateKey,
        @seedPhrase,
        @derivationPath
      )
    RETURNING publicKey, createdAt;
  `;

  const [key] = await execute(query, addPrefixToObjKeys({ ...request.body, createdAt }));
  return key;
};
