export const getOptions = async (accountId: string, getAccount: any, setOptions: any) => {
  if (!accountId) return;

  const account = await getAccount({ accountId });
  const options = account.list.map((publicKey: string) => ({
    value: publicKey,
    label: publicKey,
    permission: account.map[publicKey].permission,
  }));

  setOptions(options);
};
