import { utils } from './utils.js';

export const create = async ({ execute, request }) => {
  const { publicKey, spaceId, networkId, privateKey, seedPhrase, derivationPath } = request.body;
  const createdAt = Date.now();
  const dPath = utils.derivationPath.serialize(derivationPath);

  const query = `
    INSERT INTO near_protocol_keys 
      (publicKey, spaceId, networkId, createdAt, privateKey, seedPhrase, derivationPath)
    VALUES(
      '${publicKey}', 
      '${spaceId}', 
      '${networkId}', 
      ${createdAt}, 
      '${privateKey}', 
      '${seedPhrase}',
      '${dPath}'
    )
    RETURNING publicKey, createdAt;
  `;

  const [key] = await execute(query);
  return key;
};
