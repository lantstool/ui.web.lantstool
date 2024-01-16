export const getOptions: any = async (
  accountId: string,
  getAccessKeyList: any,
  setOptions: any,
) => {
  if (!accountId) return;

  const accessKeyList = await getAccessKeyList({ accountId });

  const publicKey = accessKeyList.keys.map((key: any) => ({
    value: key.public_key,
    label: key.public_key,
    permission: key.access_key.permission,
  }));

  setOptions(publicKey);
};
