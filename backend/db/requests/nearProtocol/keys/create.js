export const create = async ({ execute, request }) => {
  const { publicKey, spaceId, networkId, privateKey, seedPhrase, derivationPath } = request.body;
  const createdAt = Date.now();

  // SQLite won't allow us to insert the string with apostrophe like m/44'/397'/0' -
  // we have to replace it with something else, for example - `
  const dPath = derivationPath ? derivationPath.replaceAll("'", "`") : null;

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
