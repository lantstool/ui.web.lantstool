export const getSignerPrivateKey = async ({
  spaceId,
  networkId,
  signerPublicKey,
  signerPrivateKey,
  getKey,
}) => {
  if (signerPrivateKey) return signerPrivateKey;
  const { privateKey } = await getKey({ spaceId, networkId, publicKey: signerPublicKey });
  return privateKey;
};
