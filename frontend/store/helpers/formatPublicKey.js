export const formatPublicKey = (key) => {
  return key.replace(/\bed25519:\b/g, '');
};
