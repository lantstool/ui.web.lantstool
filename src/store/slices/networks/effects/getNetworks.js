import { effect } from '../../../../react-vault';

const spaceId = 'space1'; // TODO - get the real spaceId from store

export const getNetworks = effect(async ({ slice, store }) => {
  const [idb] = store.getEntities((store) => store.idb);
  const setNetworks = slice.getActions((slice) => slice.setNetworks);

  try {
    const networks = await idb.getAllFromIndex(
      'networks',
      'spaceId_createdAt',
      IDBKeyRange.bound([spaceId, 0], [spaceId, Infinity]),
    );

    setNetworks(networks);
  } catch (e) {
    console.log(e);
  }
});
