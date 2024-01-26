export const onSetKeyList: any = async (
  getAccessKeyList: any,
  accountId: any,
  setKeyList: any,
) => {
  const accessKeyList = await getAccessKeyList({ accountId });
  setKeyList(accessKeyList.keys);
};
