import { effect } from '../../../../react-vault';

export const getKeys = effect(async ({ store }: any) => {
  const [idb] = store.getEntities((store: any) => store.idb);

  try {
    const range = IDBKeyRange.bound(["space1", 0], ["space1", 5]);
    const a = await idb.getAllFromIndex('keys', 'space', range);

    console.log(a);
  } catch (e) {
    console.log(e);
  }
});