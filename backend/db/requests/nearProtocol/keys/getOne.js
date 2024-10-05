import { utils } from './utils.js';

export const getOne = async ({ execute, request }) => {
  const query = `
    SELECT * FROM near_protocol_keys
    WHERE spaceId = '${request.body.spaceId}' 
      AND networkId = '${request.body.networkId}'
      AND publicKey = '${request.body.publicKey}'
  `;

  const [key] = await execute(query);
  console.log('key', key);

  key.derivationPath = utils.derivationPath.deserialize(key.derivationPath);

  return key;
};
