import { effect } from "../../../react-vault";


export const onRemoveAccount = effect(async ({ payload, slice, store }: any) => {
  const [idb] = store.getEntities((store: any) => store.idb);
  const removeAccount = slice.getActions((slice: any) => slice.removeAccount);
  const accountId = payload.activeAccId

  try {
    await idb.delete('vault', accountId)
    removeAccount(accountId)
  }catch (e) {
    console.log(e);
  }
})