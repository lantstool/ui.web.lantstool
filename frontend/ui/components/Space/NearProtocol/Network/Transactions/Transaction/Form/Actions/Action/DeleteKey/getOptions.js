export const getOptions = async (accountId, getAccessKeyList, setOptions) => {
  if (!accountId) return;

  const accessKeyList = await getAccessKeyList(accountId);

  const publicKey = accessKeyList.keys.map((key) => ({
    value: key.public_key,
    label: key.public_key,
    permission: key.access_key.permission,
  }));

  setOptions(publicKey);
};
